import { lazy, useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import LoadingWrapper from "./components/Global/Loading/LoadingWrapper";
import { BookConsultant } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import StudentRequest from "./pages/StudentRequest";
import { onMessageListener } from "../firebase";
import Chat from "./pages/chat/Chat";
import AddRequest from "./pages/Request/AddRequest";

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
// const ProgramsTypeDetails = lazy(() =>
//   import("./pages/ProgramsType/ProgramsTypeDetails")
// );
// const ProgramDetails = lazy(() =>
//   import("./pages/ProgramsType/ProgramDetails")
// );
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
const DesignYourOwnCourse = lazy(
  () => import("./pages/DesignCourse/DesignYourOwnCourse")
);
const DesignYourOwnCourseDetails = lazy(
  () => import("./pages/DesignCourse/DesignYourOwnCourseDetails")
);
const DesignYourOwnCourseRegister = lazy(
  () => import("./pages/DesignCourse/DesignYourOwnCourseRegister")
);
const DesignCourseRegistration = lazy(
  () => import("./pages/DesignCourse/DesignCourseRegistration")
);
const UniversityAdmissionRegister = lazy(
  () =>
    import("./pages/UniversityAdmissionRegister/UniversityAdmissionRegister")
);
const EnglishAdmissionRegister = lazy(
  () => import("./pages/EnglishAdmissionRegister/EnglishAdmissionRegister")
);

function App() {
  const isRTL = useRTL();

  useLayoutEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = isRTL ? "ar" : "en";
  }, [isRTL]);

  onMessageListener()
    .then((payload: any) => {
      toast(
        <div>
          <p>{payload?.notification?.title}</p>
          <p>{payload?.notification?.body}</p>
        </div>
      );
    })
    .catch((err) => console.log("err"));

return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingWrapper>
          <Routes>
            <Route path="/" element={<StructurePages />}>
              <Route index element={<Home />} />
              <Route path="bePartner" element={<BePartner />} />
              <Route path="programsSummer" element={<SummerProgramsPage />} />
              <Route
                path="programsSummer/details"
                element={<SummerProgramDetails />}
              />
              <Route
                path="universityAdmissions"
                element={<UniversityAdmissionPage />}
              />
              <Route
                path="universityAdmissions/details"
                element={<UniversityAdmissionsDetails />}
              />
              <Route path="englishLanguage" element={<EnglishLanguagePage />} />
              <Route
                path="englishLanguage/details"
                element={<EnglishLanguageDetails />}
              />
              <Route
                path="listSpecializations"
                element={<ListSpecializations />}
              />
              <Route path="specializations" element={<SpecializationsPage />} />
              <Route path="studentRequest" element={<StudentRequest />} />
              <Route path="/addRequest" element={<AddRequest />} />
              <Route path="/designCourse" element={<DesignYourOwnCourse />} />
              <Route
                path="/designCourse/details"
                element={<DesignYourOwnCourseDetails />}
              />
              <Route
                path="/designCourse/register"
                element={<DesignYourOwnCourseRegister />}
              />
              <Route
                path="/designCourse/registration"
                element={<DesignCourseRegistration />}
              />
            </Route>
            <Route path="/chat" element={<Chat />} />
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
              path="/UniversityAdmissionRegister"
              element={<UniversityAdmissionRegister />}
            />
            <Route
              path="/EnglishAdmissionRegister"
              element={<EnglishAdmissionRegister />}
            />
            <Route
              path="/englishLanguage/details"
              element={<EnglishLanguageDetails />}
            />
            <Route
              path="/listSpecializations"
              element={<ListSpecializations />}
            />
            <Route path="/specializations" element={<SpecializationsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bookConsultant" element={<BookConsultant />} />
            <Route path="/whyUs" element={<ChooseUtopia isFootered />} />
            <Route path="/successStory" element={<SuccessStoriesPage />} />
            <Route path="/bankAccounts" element={<BankAccounts />} />
            <Route path="/ourPartners" element={<OurPartners />} />
          </Routes>
        </LoadingWrapper>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
