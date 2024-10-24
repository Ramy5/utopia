import { useAuth } from "../../../context/AuthContext";
import { useRTL } from "../../../hooks/useRTL";
import Loading from "./Loading";
import { Suspense, useLayoutEffect } from "react";

const LoadingWrapper = ({ children }) => {
  const isRTL = useRTL();
  const { role } = useAuth();

  useLayoutEffect(() => {
    if (role === "Partner") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    } else {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = isRTL ? "ar" : "en";
    }
  }, [isRTL, role]);

  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LoadingWrapper;
