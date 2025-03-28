import React from "react";
import googlePlay from "../../../../assets/googlePlay.png";
import appStore from "../../../../assets/AppStore.png";
import { t } from "i18next";

const DownLoadApp = () => {
  return (
    <div className="hidden items-center bookConsultantBg h-[22rem] sm:flex ">
      <div className="w-full max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[80rem] mx-auto md:px-4">
        <h2 className="text-white text-3xl mb-10">
          {t("Download the app now")}
        </h2>
        <div className="flex items-center gap-4">
          <img className="w-44 " src={googlePlay} alt="google play" />
          <img className="w-44 " src={appStore} alt="app store" />
        </div>
      </div>
    </div>
  );
};

export default DownLoadApp;
