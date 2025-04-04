import { lazy, useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRTL } from "./hooks/useRTL";
import LoadingWrapper from "./components/Global/Loading/LoadingWrapper";
import { BookConsultant } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./context/AuthContext";
import StudentRequest from "./pages/StudentRequest";
import { onMessageListener } from "../firebase";
import Chat from "./pages/chat/Chat";
import AddRequest from "./pages/Request/AddRequest";
import { ROLE } from "./constants/LocalStorageKeys";
import { useTranslation } from "react-i18next";

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
const Notifications = lazy(() => import("./pages/Notifications"));
const Accounts = lazy(() => import("./pages/Accounts"));
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
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
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
const DesignOwnRegistrationFormPage = lazy(
  () => import("./pages/DesignCourse/DesignOwnRegistrationFormPage")
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
const ViewRequest = lazy(() => import("./pages/ViewRequest"));
const Orders = lazy(() => import("./pages/Orders/Orders"));

// PARTNER
const PartnerBookingList = lazy(
  () => import("./pages/Partner/PartnerBookingList/PartnerBookingList")
);
const PartnerUsers = lazy(() => import("./pages/Partner/Users/Users"));
const PartnerContact = lazy(() => import("./pages/Partner/Contact/Contact"));
const PartnerSnatches = lazy(() => import("./pages/Partner/Snatches/Snatches"));
const ViewPartnerRequest = lazy(
  () => import("./pages/Partner/Requests/ViewPartnerRequest")
);
const MessageOperationEnd = lazy(
  () => import("./pages/BookConsultant/messageOperationEnd")
);

const getDefaultLanguage = () => {
  const language = navigator.language;
  return language.startsWith("ar") ? "ar" : "en";
};

function App() {
  const [language, setLanguage] = useState(getDefaultLanguage());
  const { i18n } = useTranslation();
  const isRTL = useRTL();
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

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dir = language ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

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
              <Route path="/favorites" element={<Favorites />} />
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
                path="/designRegister"
                element={<DesignOwnRegistrationFormPage />}
              />
              <Route
                path="/designCourse/registration"
                element={<DesignCourseRegistration />}
              />
              <Route path="/viewRequest/:id" element={<ViewRequest />} />
              <Route path="/orders" element={<Orders />} />

              {/* PARTNER */}
              <Route
                path="/PartnerBookingList"
                element={<PartnerBookingList />}
              />
              <Route path="/partnerUsers" element={<PartnerUsers />} />
              <Route path="/partnerContact" element={<PartnerContact />} />
              <Route path="/partnerSnatches" element={<PartnerSnatches />} />
              <Route
                path="/viewPartnerRequest/:id"
                element={<ViewPartnerRequest />}
              />
              {/* PARTNER */}
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
            <Route path="/Message_peration" element={<MessageOperationEnd />} />
            <Route path="/whyUs" element={<ChooseUtopia isFootered />} />
            <Route path="/successStory" element={<SuccessStoriesPage />} />
            <Route path="/bankAccounts" element={<BankAccounts />} />
            <Route path="/ourPartners" element={<OurPartners />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </LoadingWrapper>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
