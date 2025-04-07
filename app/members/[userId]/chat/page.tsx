import CardInnerWrapper from "@/components/CardInnerWrapper";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessages } from "@/app/actions/messageAction";
import MessageBox from "./MessageBox";

const ChatPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const messages = await getMessages(userId);

  const body = (
    <div>
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={userId}
            />
          ))}
        </>
      ) : (
        <div>No messages to display</div>
      )}
    </div>
  );
  return (
    <>
      <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
    </>
  );
};

export default ChatPage;
