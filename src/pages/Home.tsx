import BookConsultation from "../components/LandingPage/BookConsultation";
import LatestOffersFeatures from "../components/LandingPage/latestOffersFeatures";
import ProgramsType from "../components/LandingPage/ProgramsType";
import { apiRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

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
      <BookConsultation data={data} />

      <ProgramsType data={data} />

      <LatestOffersFeatures data={data} />
    </div>
  );
};

export default Home;
