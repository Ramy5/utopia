import React from "react";
import googlePlay from "../../../../assets/googlePlay.png";
import appStore from "../../../../assets/AppStore.png";
import { t } from "i18next";

const DownLoadApp = () => {
  return (
    <div className="hidden items-center bookConsultantBg h-[22rem] sm:flex ">
      <div className="px-8">
        <h2 className="text-white text-3xl mb-10">
          {t("download the app now")}
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
