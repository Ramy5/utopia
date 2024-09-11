import { lazy, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import LoadingWrapper from "./components/Global/Loading/LoadingWrapper";

const StructurePages = lazy(() => import("./pages/StructurePages"));
const Home = lazy(() => import("./pages/Home"));
const BePartner = lazy(() => import("./pages/BePartner/BePartner"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ChooseUtopia = lazy(
  () => import("./components/LandingPage/ChooseUtopia")
);
const successStoryPage = lazy(() => import("./pages/successStoryPage"));

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
            <Route path="/bePartner" element={<BePartner />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/whyUs" element={<ChooseUtopia isFootered />} />
          <Route path="/successStory" element={<successStoryPage />} />
        </Routes>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
