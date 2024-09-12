import { t } from "i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import SuccessStoryCard, {
  SuccessStoryCardProps,
} from "../components/UI/SuccessStoryCard";

const successCardData: SuccessStoryCardProps[] = [
  {
    name: "نارين احمد الحربي",
    location: "نيويورك-امريكا-معهدرباد",
    description:
      "حيث اصبحت كاتبة مشهورة بفضل مهارتها اللغوية الرائعة. بفضل تحفيزها الأكاديمي وإبداعها، نشرت العديد من الكتب التي نالت استحسان النقاد والقراء على حد سواء.",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    name: "نارين احمد الحربي",
    location: "نيويورك-امريكا-معهدرباد",
    description:
      "حيث اصبحت كاتبة مشهورة بفضل مهارتها اللغوية الرائعة. بفضل تحفيزها الأكاديمي وإبداعها، نشرت العديد من الكتب التي نالت استحسان النقاد والقراء على حد سواء.",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    name: "نارين احمد الحربي",
    location: "نيويورك-امريكا-معهدرباد",
    description:
      "حيث اصبحت كاتبة مشهورة بفضل مهارتها اللغوية الرائعة. بفضل تحفيزها الأكاديمي وإبداعها، نشرت العديد من الكتب التي نالت استحسان النقاد والقراء على حد سواء.",
    imageUrl: "https://via.placeholder.com/50",
  },
];

const successStoryPage = () => {
  return (
    <div className="px-6 py-4">
      <div
        style={{ gridTemplateColumns: "20px 1fr" }}
        className="grid items-center justify-center"
      >
        <Link to={"/"}>
          <FaArrowRightLong className="text-xl cursor-pointer justify-self-start" />
        </Link>
        <h4 className="text-xl font-bold text-center">
          {t("success stories")}
        </h4>
      </div>

      <div className="py-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {successCardData.map((card, index) => (
            <SuccessStoryCard
              key={index}
              name={card.name}
              location={card.location}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
        <div className="flex justify-end mt-2">
          <button className="underline text-mainColor">المزيد</button>
        </div>
      </div>
    </div>
  );
};

export default successStoryPage;
