import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
  isMobail?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isMobail }) => {
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      dir="ltr"
      ref={messageListRef}
      className={`${
        isMobail ? "w-[100vw]" : "w-[40vw]"
      }  mx-auto p-4 space-y-8 overflow-y-auto scrollbar-none`}
    >
      {messages.map((message) => (
        <MessageItem key={message.id} isMobail message={message} />
      ))}
    </div>
  );
};

export default MessageList;
