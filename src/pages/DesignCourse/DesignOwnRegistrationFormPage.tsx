import React, { useEffect } from "react";
import { Footer, Navbar } from "../../components";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import DesignOwnRegistrationForm from "./DesignOwnRegistrationForm";
import { useLocation } from "react-router-dom";

const DesignOwnRegistrationFormPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  },[])

  return (
    <div>
      <div className="">
        <DesignOwnRegistrationForm designOwn={location.state}/>
      </div>

      <DownLoadApp />
    </div>
  );
};

export default DesignOwnRegistrationFormPage;
