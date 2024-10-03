import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db, onMessageListener } from "../../../firebase";
import MessageList from "../../components/chat/MessageList";
import MessageInput from "../../components/chat/MessageInput";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import DownLoadApp from "../../components/atoms/molecules/downLoad-app/DownLoadApp";
import { FaArrowRightLong } from "react-icons/fa6";
import { t } from "i18next";
import { Footer, Navbar } from "../../components";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  console.log("🚀 ~ messages:", messages);
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
    <div>
      <div className="max-w-full sm:max-w-5xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
        <Navbar hidden />
      </div>

      {/* DESKTOP */}
      <div className="hidden sm:flex bg-[#F7F7F7] max-w-full sm:max-w-5xl flex-col justify-between items-center md:max-w-6xl lg:max-w-[90rem] p-24 rounded-[150px] shadow-lg mx-auto h-[85vh] my-10">
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>

      <DownLoadApp />

      {/* MOBAIL */}
      <div className="flex flex-col sm:hidden">
        <div
          style={{ gridTemplateColumns: "20px 1fr" }}
          className="grid items-center justify-center px-6 py-3"
        >
          <FaArrowRightLong className="cursor-pointer justify-self-start" />
          <h4 className="text-xl font-bold text-center">
            {t("chat with utopia team")}
          </h4>
        </div>

        <div className="flex-col flex justify-between items-center h-[85vh]">
          <MessageList messages={messages} isMobail />
          <MessageInput isMobail onSendMessage={handleSendMessage} />
        </div>
      </div>

      <Footer hidden />
    </div>
  );
};

export default Chat;
