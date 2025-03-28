import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import { t } from "i18next";
import { toast } from "react-toastify";
import { apiRequest } from "../../../utils/axios";
import cn from "../../../utils/cn";
import DownLoadApp from "../../atoms/molecules/downLoad-app/DownLoadApp";
import { useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const postFavorite = async (postData) => {
  try {
    const data = await apiRequest({
      url: "/api/student/store-favorite",
      method: "POST",
      data: postData,
    });
    return data?.data;
  } catch (errors) {
    toast.error(errors);
    console.log("🚀 ~ loginPost ~ error:", errors);
  }
};

type VerificationCode_TP = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  userId?: number;
  packageId?: number;
  mutatePackage?: any;
  selectedCourse?: any;
};

const VerificationCode: React.FC<VerificationCode_TP> = ({
  userId,
  setStep,
  mutatePackage,
  selectedCourse,
  packageId,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isPending, setIsPending] = useState(false);
  const { values } = useFormikContext();
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const [timer, setTimer] = useState(() => {
    const storedVerification = localStorage.getItem("verification");
    return storedVerification
      ? JSON.parse(storedVerification)?.expiredInSeconds || 0
      : 0;
  });

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newOtp = [...otp];

    if (/^[0-9]$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input if available
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Clear the current input and move to the previous one if backspacing
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["Favorite"],
    mutationFn: (data: any) => postFavorite(data),
    onSuccess: (data) => {
      toast.success(data?.message);
      navigate("/favorites");
    },
  });

  const verifyOTP = async (otp: string) => {
    try {
      setIsPending(true);
      const data = await apiRequest({
        url: "/api/student/checkOtp2",
        method: "POST",
        data: {
          user_id: userId,
          code: otp,
        },
      });
      toast.success("verify is completed");
      setIsPending(false);
      if (!!selectedCourse) {
        navigate("/designCourse/register", {
          state: {
            id: selectedCourse?.id,
            numberOfWeeks: selectedCourse?.numberOfWeeks,
            startDate: selectedCourse?.startDate,
            amount: selectedCourse?.amount,
            user_id: data?.data?.user?.id,
          },
        });
      } else if (!!mutatePackage) {
        mutatePackage({
          user_id: data?.data?.user?.id,
          plan_id: values?.plan_id,
          partner_id: values?.partner_id,
          package_id: values?.package_id,
        });
      } else if (packageId) {
        mutate({ package_id: packageId });
      } else {
        setStep(3);
      }
      setAuthData(data?.data);
      return data?.data;
    } catch (error) {
      setIsPending(false);
      console.error("Error fetching items:", error.message);
    }
  };

  const handleVerify = () => verifyOTP(otp.join(""));

  return (
    <div>
      <div className="flex flex-col items-center px-4 my-32">
        <div className="w-full max-w-sm">
          <Button className="w-full py-4 text-sm text-white cursor-auto rounded-2xl hover:scale-100">
            {t("please type the OTP sent to your phone number")}
          </Button>
          <div className="flex justify-between mb-4 font-bold text-mainColor my-14">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                className="w-20 h-20 text-2xl text-center border rounded-2xl border-mainColor/80 focus:outline-none"
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <p
            className={cn(
              "w-full cursor-pointer text-center underline py-2 mt-10",
              {
                "opacity-40 cursor-not-allowed": isPending,
              }
            )}
            onClick={handleVerify}
          >
            {t("next")}
          </p>
        </div>
      </div>
      <DownLoadApp />
    </div>
  );
};

export default VerificationCode;
