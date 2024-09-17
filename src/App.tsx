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
const SummerProgramsPage = lazy(
  () => import("./pages/ProgramsType/SummerProgramsPage")
);
const SummerProgramDetails = lazy(
  () => import("./pages/ProgramsType/SummerProgramDetails")
);
const UniversityAdmissionPage = lazy(
  () => import("./pages/ProgramsType/UniversityAdmissionPage")
);
const UniversityAdmissionsDetails = lazy(
  () => import("./pages/ProgramsType/UniversityAdmissionsDetails")
);
const EnglishLanguagePage = lazy(
  () => import("./pages/ProgramsType/EnglishLanguagePage")
);
const EnglishLanguageDetails = lazy(
  () => import("./pages/ProgramsType/EnglishLanguageDetails")
);
const ListSpecializations = lazy(
  () => import("./pages/ProgramsType/ListSpecializations")
);
const SpecializationsPage = lazy(
  () => import("./pages/ProgramsType/SpecializationsPage")
);

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
            <Route path="/programsSummer" element={<SummerProgramsPage />} />
            <Route
              path="/programsSummer/details"
              element={<SummerProgramDetails />}
            />
            <Route
              path="/universityAdmissions"
              element={<UniversityAdmissionPage />}
            />
            <Route
              path="/universityAdmissions/details"
              element={<UniversityAdmissionsDetails />}
            />
            <Route path="/englishLanguage" element={<EnglishLanguagePage />} />
            <Route
              path="/englishLanguage/details"
              element={<EnglishLanguageDetails />}
            />
            <Route path="/listSpecializations" element={<ListSpecializations />} />
            <Route path="/specializations" element={<SpecializationsPage />} />
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
