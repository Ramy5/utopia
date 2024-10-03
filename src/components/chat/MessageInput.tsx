import { Form, Formik } from "formik";
import { t } from "i18next";
import React, { useState } from "react";
import BaseInput from "../atoms/molecules/formik-fields/BaseInput";
import { BsFillSendFill } from "react-icons/bs";
import Button from "../atoms/Button/Button";
import cn from "../../utils/cn";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isMobail?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isMobail,
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSendMessage(text);
    setText("");
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { resetForm }) => {
        handleSend();
        resetForm();
      }}
    >
      <Form className={`${isMobail ? " w-[100vw]" : " w-[40vw]"}`}>
        <div className="flex w-full gap-2 p-4 mt-8">
          <Button
            type="submit"
            className={cn(
              "flex items-center justify-center py-3 text-white rounded-2xl",
              {
                "bg-mainColor order-2 p-4 w-12 h-12 rounded-full": isMobail,
                "bg-[#FFB6BF]": !isMobail,
              }
            )}
          >
            <BsFillSendFill className="text-2xl -rotate-90" />
          </Button>
          <input
            type="text"
            placeholder={t("type a message...")}
            name="message"
            id="message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            className={cn(
              "p-2 placeholder-white py-3 caret-mainColor rounded-2xl focus-within:outline-none w-full focus:border-none border-none  outline-none text-start ",
              {
                "!bg-mainColor/50": isMobail,
                "!bg-[#FFB6BF]": !isMobail,
              }
            )}
          />
        </div>
      </Form>
    </Formik>
  );
};

export default MessageInput;
