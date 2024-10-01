import React from "react";
import { useAuth } from "../../context/AuthContext";

interface MessageItemProps {
  message: {
    text: string;
    user: string;
    createdAt: any;
  };
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-start space-x-2">
      <div className="flex items-center gap-2">
        <img
          src={user.image}
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-sm font-semibold text-gray-600">{message.user}</p>
      </div>
      <div className="p-3 bg-white shadow-md rounded-xl">
        <p className="text-gray-800">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageItem;
