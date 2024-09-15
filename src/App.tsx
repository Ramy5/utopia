import { lazy, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import LoadingWrapper from "./components/Global/Loading/LoadingWrapper";
import { BookConsultant } from "./pages";

const StructurePages = lazy(() => import("./pages/StructurePages"));
const Home = lazy(() => import("./pages/Home"));
const BePartner = lazy(() => import("./pages/BePartner/BePartner"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ChooseUtopia = lazy(
  () => import("./components/LandingPage/ChooseUtopia")
);
const SuccessStoriesPage = lazy(() => import("./pages/SuccessStoriesPage"));
const BankAccounts = lazy(() => import("./pages/BankAccounts"));
const OurPartners = lazy(() => import("./pages/OurPartners"));
const ProgramsTypeDetails = lazy(() => import("./pages/ProgramsType/ProgramsTypeDetails"));
const ProgramDetails = lazy(() => import("./pages/ProgramsType/ProgramDetails"));

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
            <Route path="/bookConsultant" element={<BookConsultant />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/programs" element={<ProgramsTypeDetails />} />
            <Route path="/programs/details" element={<ProgramDetails />} />
          </Route>
          <Route path="/whyUs" element={<ChooseUtopia isFootered />} />
          <Route path="/successStory" element={<SuccessStoriesPage />} />
          <Route path="/bankAccounts" element={<BankAccounts />} />
          <Route path="/ourPartners" element={<OurPartners />} />
        </Routes>
      </LoadingWrapper>
    </BrowserRouter>
  );
}

export default App;
