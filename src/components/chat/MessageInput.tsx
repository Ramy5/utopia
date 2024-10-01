import { t } from "i18next";
import React, { useState } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSendMessage(text);
    setText("");
  };

  return (
    <div className="flex items-center p-4 mt-4">
      <input
        type="text"
        placeholder={t("type a message...")}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 placeholder-white bg-transparent outline-none text-start !bg-mainColor"
      />
      <button
        onClick={handleSend}
        className="flex items-center justify-center p-2 ml-2 text-white rounded-full bg-mainColor"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14m-7-7l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
