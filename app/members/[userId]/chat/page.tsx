import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessages } from "@/app/actions/messageAction";
import MessageBox from "./MessageBox";
import MessageList from "./MessageList";
import { createChatId } from "@/lib/util";
import { auth } from "@/auth";
import { getAuthUserid } from "@/app/actions/authActions";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const messages = await getMessages(userId);
  const currentUserId = await getAuthUserid()
  console.log(currentUserId)
  const chatId = createChatId(currentUserId, userId)

  const body = (
    <MessageList 
    currentuserId={userId}
    intitalMessages={messages}
    chatId={chatId}
    />
  );
  return (
    <>
      <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
    </>
  );
};

export default ChatPage;
