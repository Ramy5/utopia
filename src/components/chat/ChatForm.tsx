import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, onMessageListener } from "../../../firebase";
import { toast } from "react-toastify";

interface chat_TP {
  className?: string;
}

const ChatForm: React.FC<chat_TP> = ({ className }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs: any[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    onMessageListener()
      .then((payload: any) => {
        toast(
          <div>
            <p>{payload?.notification?.title}</p>
            <p>{payload?.notification?.body}</p>
          </div>
        );
      })
      .catch((err) => console.log("err"));

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (text: string) => {
    console.log("🚀 ~ handleSendMessage ~ text:", text);
    if (text.trim()) {
      await addDoc(collection(db, "messages"), {
        text,
        createdAt: Timestamp.now(),
        user: user?.name,
      });
    }
  };
  return (
    <section>
      {/* DESKTOP */}
      <div
        className={`hidden sm:flex bg-[#F7F7F7] max-w-full sm:max-w-5xl flex-col justify-between items-center md:max-w-6xl lg:max-w-[80rem] p-24 rounded-[150px] shadow-lg mx-auto h-[85vh] my-10 ${className}`}
      >
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      {/* MOBAIL */}
      <div className="flex-col flex sm:hidden justify-between items-center h-[85vh]">
        <MessageList messages={messages} isMobail />
        <MessageInput isMobail onSendMessage={handleSendMessage} />
      </div>
    </section>
  );
};

export default ChatForm;
