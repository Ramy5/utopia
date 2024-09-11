import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

interface NotificationProps {
  message: string;
  date: string;
  isHighlighted?: boolean;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  date,
  isHighlighted = false,
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
        <p className="flex items-start gap-4 text-xs font-medium text-gray-900">
          <span>{message}</span>
          <span>
            <RiDeleteBinLine className="p-1 text-2xl text-white bg-black rounded-lg" />
          </span>
        </p>
        <p className="mt-4 text-xs text-left text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default Notification;
