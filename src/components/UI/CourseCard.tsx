import React from "react";
import { Link } from "react-router-dom";

type CourseCardProps = {
  id: number;
  user: string;
  date_start: string;
  status: number;
  amount: number;
  image: string;
  package_name: string;
  partner: string;
};

const CourseCard: React.FC<CourseCardProps> = (request) => {
  const {
    id,
    user,
    date_start: startDate,
    status,
    amount,
    image,
    package_name: packageName,
    partner,
  } = request;

  return (
    <Link
      to={`/viewRequest/${id}`}
      key={id}
      className="flex items-start p-2 mb-4 rounded-lg shadow bg-mainColor/10"
    >
      <img
        src={image}
        alt="Profile"
        className="object-cover w-24 h-32 rounded-lg"
      />
      <div className="w-full px-2">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold">{user}</p>
          <div className="p-1 pb-2 text-xs text-gray-600 border border-black rounded-lg">
            تحت الإجراء
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs">
            <span className="font-semibold">المعهد: </span>
            <span className="text-xs text-gray-500">{partner}</span>
          </p>
          <p className="text-xs">
            <span className="font-semibold">الكورس: </span>
            {/* <span className="text-xs text-gray-500">
              {course} ({lessonsCount} درس)
            </span> */}
            <span className="text-xs text-gray-500">{packageName}</span>
          </p>
          <p className="text-xs">
            <span className="font-semibold">تاريخ بداية الدراسة: </span>
            <span className="text-xs text-gray-500">{startDate}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
