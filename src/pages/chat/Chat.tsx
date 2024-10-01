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

const Chat: React.FC = () => {
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
    if (text.trim()) {
      await addDoc(collection(db, "messages"), {
        text,
        createdAt: Timestamp.now(),
        user: user?.name,
      });
    }
  };

  return (
    <div className="bg-[#F7F7F7] max-w-full sm:max-w-5xl flex flex-col justify-between items-center md:max-w-6xl lg:max-w-[90rem] p-22 rounded-[150px] shadow-lg mx-auto h-[80vh] my-10">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
