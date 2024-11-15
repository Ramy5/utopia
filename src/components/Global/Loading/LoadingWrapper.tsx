import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useRTL } from "../../../hooks/useRTL";
import Loading from "./Loading";
import { Suspense, useLayoutEffect, useEffect, useState } from "react";

const LoadingWrapper = ({ children }) => {
  const isRTL = useRTL();
  const { role } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    if (role === "Partner") {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = "en";
    } else {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = isRTL ? "ar" : "en";
    }
  }, [isRTL, role]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timeout);
  }, [location]);

  return isLoading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <div key={location.pathname}>{children}</div>
    </Suspense>
  );
};

export default LoadingWrapper;
