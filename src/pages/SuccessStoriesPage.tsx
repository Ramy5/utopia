import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { apiRequest } from "../utils/axios";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../components/atoms/Button/Button";

const SuccessStoriesPage = () => {
  const fetchSuccessStory = async () => {
    try {
      const response = await apiRequest({
        url: "/api/student/stories",
        method: "GET",
      });

      return response?.data || [];
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const { data = [] } = useQuery({
    queryKey: ["success_story"],
    queryFn: fetchSuccessStory,
    suspense: true,
  });
  return (
    <div className="px-4 pb-4 block sm:hidden">
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 ">
          <Link to={"/"}>
            <FaArrowRightLong
              size={22}
              className="mt-4 cursor-pointer justify-self-start"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-medium text-center py-12">
          {t("success stories")}
        </h2>
      </div>

      {data?.map((story, index) => (
        <div
          key={index}
          className="shadow-xl rounded-2xl bg-[#E8DEFF] relative h-full z-0 py-2 px-2 mb-8"
        >
          <div className="px-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold relative mb-3.5 text-black group-hover:text-white duration-300 ">
                  {story.name}
                </h2>
                <p className="font-medium">{story.title}</p>
              </div>
              <img
                src={story?.image}
                className="w-24 h-24 rounded-full group-hover:rounded-b-none object-cover transition-all duration-1000 ease-in-out"
              />
            </div>
            <h3 className="py-8 text-lg font-medium">
              <span dangerouslySetInnerHTML={{ __html: story?.desc }} />
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuccessStoriesPage;
