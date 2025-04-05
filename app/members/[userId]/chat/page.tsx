import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import React from "react";
import ChatForm from "./ChatForm";

const ChatPage = () => {
  return (
    <>
      <CardInnerWrapper
        header="Chat"
        body={
          <CardBody className="flex flex-col gap-4">
            <div className="text-2xl font-semibold text-secondary">
              Chat with your friends
            </div>
          </CardBody>
        }
        footer={<ChatForm />}
      />
    </>
  );
};

export default ChatPage;
