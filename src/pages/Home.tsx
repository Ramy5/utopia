import { useEffect } from "react";
import BookConsultation from "../components/LandingPage/BookConsultation";
import LatestOffersFeatures from "../components/LandingPage/LatestOffersFeatures";
import ProgramsType from "../components/LandingPage/ProgramsType";
import { apiRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import ProgramTypePackages from "../components/LandingPage/ProgramTypePackages";
import ChooseUtopia from "../components/LandingPage/ChooseUtopia";
import UniversityAdmissions from "../components/LandingPage/UniversityAdmissions";
import SuccessStories from "../components/LandingPage/SuccessStories";
import Brands from "../components/LandingPage/Brands";
import SummerPrograms from "../components/LandingPage/SummerPrograms";

const fetchItems = async () => {
  try {
    const data = await apiRequest({
      url: "/api/student/home",
      method: "GET",
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};

const Home = () => {
  const { data } = useQuery({
    queryKey: ["landing-page-data"],
    queryFn: fetchItems,
    suspense: true,
  });
  console.log("🚀 ~ fetchItems ~ data:", data);

  return (
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] md:px-8 mx-auto">
        <BookConsultation data={data} />

        <ProgramsType data={data} />

        <LatestOffersFeatures data={data} />

        <ProgramTypePackages data={data} />

        <ChooseUtopia />

        <UniversityAdmissions data={data} />

        <SummerPrograms data={data} />
      </div>

      <SuccessStories />

      <Brands />
    </div>
  );
};

export default Home;
