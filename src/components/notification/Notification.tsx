import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import FormatDate from "../../utils/FormatDate";

interface NotificationProps {
  message: string;
  title: string;
  date: string;
  id: number | string;
  isHighlighted?: boolean;
  onDelete: (id: string | number) => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  date,
  title,
  isHighlighted = false,
  id,
  onDelete,
}) => {
  return (
    <div
      className={`flex shadow-lg items-center p-4 border rounded-lg mb-2 ${
        isHighlighted ? "bg-mainColor/30" : "bg-white"
      }`}
    >
      {/* Icon */}

      {/* Text */}
      <div className="flex-1">
        <p className="flex items-start justify-between gap-4 text-xs font-medium text-gray-900">
          <span>{title}</span>
          <span className="cursor-pointer" onClick={() => onDelete(id)}>
            <RiDeleteBinLine className="p-1 text-2xl text-white bg-black rounded-lg" />
          </span>
        </p>
        <p>{message}</p>
        <p className="mt-4 text-xs text-left text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default Notification;
