import { lazy, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import LoadingWrapper from "./components/Global/Loading/LoadingWrapper";

const StructurePages = lazy(() => import("./pages/StructurePages"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const isRTL = useRTL();

  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  return (
    <BrowserRouter>
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<StructurePages />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
