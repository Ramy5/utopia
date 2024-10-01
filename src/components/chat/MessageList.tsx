import React from "react";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="w-[70vw] p-4 space-y-4 mt-16 overflow-y-auto scrollbar-none message-list">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
