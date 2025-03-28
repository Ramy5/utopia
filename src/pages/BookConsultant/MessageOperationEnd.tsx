import React from "react";
import { useRTL } from "../../hooks/useRTL";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo-footer.svg";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { Footer, Navbar } from "../../components";

const MessageOperationEnd = () => {
  const isRTL = useRTL();
  const { user } = useAuth();

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto">
        <Navbar />
      </div>

      <div>
        <div className="flex rounded-2xl flex-col items-center justify-center w-[80%] md:w-[578px] bg-mainColor my-24 mx-auto text-white p-6 gap-7">
          <h1 className="text-4xl sm:text-6xl">
            {isRTL ? `اهلا ${user?.name}` : `welcome ${user?.name}`}
          </h1>
          <p className="text-lg text-center sm:w-96">
            {t(
              "The request has been sent, and the educational consultant will contact you soon."
            )}
          </p>
          <p className="text-lg">{t("have a nice day")}</p>
          <div className="flex flex-col items-center gap-1">
            <img src={logo} alt="logo" />
            <p className="text-sm">{t("utopia team")}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            to={"/"}
            className="px-6 py-1 mb-12 text-white bg-black rounded-md"
          >
            {t("back to home")}
          </Link>
        </div>
      </div>

      <DownLoadApp />

      <Footer />
    </div>
  );
};

export default MessageOperationEnd;
