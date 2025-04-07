import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessages } from "@/app/actions/messageAction";

const ChatPage = async ({params}: {params: Promise<{userId: string}>}) => {
  const { userId } = await params;
  const messages = await getMessages(userId)
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
