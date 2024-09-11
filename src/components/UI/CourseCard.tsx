import React from "react";

type CourseCardProps = {
  name: string;
  institute: string;
  course: string;
  lessonsCount: number;
  startDate: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  name,
  institute,
  course,
  lessonsCount,
  startDate,
}) => {
  return (
    <div className="flex items-start p-2 mb-4 rounded-lg shadow bg-mainColor/10">
      <img
        src="https://via.placeholder.com/48"
        alt="Profile"
        className="object-cover w-24 h-32 rounded-lg"
      />
      <div className="w-full px-2">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold">{name}</p>
          <div className="p-1 pb-2 text-xs text-gray-600 border border-black rounded-lg">
            تحت الإجراء
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs">
            <span className="font-semibold">المعهد: </span>
            <span className="text-xs text-gray-500">{institute}</span>
          </p>
          <p className="text-xs">
            <span className="font-semibold">الكورس: </span>
            <span className="text-xs text-gray-500">
              {course} ({lessonsCount} درس)
            </span>
          </p>
          <p className="text-xs">
            <span className="font-semibold">تاريخ بداية الدراسة: </span>
            <span className="text-xs text-gray-500">{startDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
