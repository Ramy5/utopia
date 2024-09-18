import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../atoms/Button/Button";
import { t } from "i18next";
import { toast } from "react-toastify";
import { apiRequest } from "../../../utils/axios";

type VerificationCode_TP = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  userId?: number;
  registerState?: any;
};

const VerificationCode: React.FC<VerificationCode_TP> = ({
  userId,
  setStep,
  registerState,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const { token, user } = useAuth();
  console.log("🚀 ~ user:", user);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const verifyOTP = async (otp: string) => {
    try {
      const data = await apiRequest({
        url: "/api/student/checkOtp",
        method: "POST",
        data: {
          user_id: userId,
          code: 1111,
        },
      });
      setStep?.(3);
      toast.success("verify is completed");
      return data?.data;
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleVerify = () => verifyOTP(otp.join(""));

  return (
    <div className="flex flex-col items-center my-32">
      <div className="w-full max-w-sm">
        <Button className="w-full text-sm text-white cursor-auto hover:scale-100">
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
              className="w-20 h-20 text-2xl text-center border rounded-lg border-mainColor/80 focus:outline-none"
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <Button action={handleVerify} className="w-full py-2 mt-10">
          Verify
        </Button>
      </div>
    </div>
  );
};

export default VerificationCode;
