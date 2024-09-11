import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../utils/axios";
import ChooseUtopia from "../components/LandingPage/ChooseUtopia";

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

const WhyUs = () => {
  const { data } = useQuery({
    queryKey: ["landing-page-data"],
    queryFn: fetchItems,
    suspense: true,
  });
  console.log("🚀 ~ fetchItems ~ data:", data);

  return (
    <div>
      <ChooseUtopia isInFooter data={data} />
    </div>
  );
};

export default WhyUs;
