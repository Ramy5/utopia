import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDateFromTimestamp } from "../../utils/GetDateFromTimestamp";

interface MessageItemProps {
  message: {
    text: string;
    user: string;
    createdAt: any;
  };
  isMobail?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isMobail }) => {
  const [profileImg, setProfileImg] = useState(null);
  const { user } = useAuth();
  console.log("🚀 ~ user:", user);

  useEffect(() => {
    setProfileImg(user.image);
  }, [user]);

  return (
    <div
      className={`${
        isMobail ? "shadow-sm px-2 w-72" : ""
      } flex flex-col items-start rounded-lg space-x-2 max-w-1/2`}
    >
      <div className="flex items-center gap-2">
        <img
          src={profileImg}
          alt="User Avatar"
          className="rounded-full w-9 h-9"
        />
        <p className="text-sm font-semibold text-gray-600">{message.user}</p>
      </div>
      <div
        className={`p-3 mt-2 w-full mx-8 break-words bg-white ${
          isMobail ? "" : "shadow-sm"
        }  max-w-96 text-wrap rounded-xl`}
      >
        <p className="text-gray-800">{message.text}</p>
        <p className="w-full mt-6 text-gray-800 text-end">
          {getDateFromTimestamp(message.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;
