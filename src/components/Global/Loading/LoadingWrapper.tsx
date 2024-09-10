import Loading from "./Loading";
import { Suspense } from "react";

const LoadingWrapper = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LoadingWrapper;
