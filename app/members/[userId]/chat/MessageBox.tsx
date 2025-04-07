'use client'
import { MessageDto } from "@/types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Avatar } from "@heroui/react";
import { transformImgUrl } from "@/lib/util";

type Props = {
  message: MessageDto;
  currentUserId: string;
};
const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = message.senderId === currentUserId;

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(( ) => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messageEndRef])

  const renderAvatar = () => {
    return (
      <Avatar
        name={message.senderName}
        className="self-end"
        src={transformImgUrl(message.senderImage!) || "/images/user.png"}
      />
    );
  };

  const messageContentClasses = clsx(
    'flex flex-col px-2 py-1',
    {
        'rounded-l-xl rounded-tr-xl text-white bg-blue-100': isCurrentUserSender,
        'rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100': !isCurrentUserSender
    }
);
  const renderMessageHeader = () => {
    return (
        <div
      className={clsx("flex items-center w-full", {
        "justify-between": isCurrentUserSender,
        
      })}
    >
      {message.dateRead && message.recipientId !== currentUserId && (
        <span className="text-xs text-black text-italic">
          (Read 4 mins ago)
        </span>
      )}
      <div className="flex">
        <span className="text-sm font-semibold text-gray-900">
          {message.senderName}
        </span>
        <span className="text-sm font-semibold text-gray-500 ml-2">
          {message.createdAt}
        </span>
      </div>
    </div>
    )
  };
  const rendermessageContent = () => {
    return <div className={messageContentClasses}>
        {renderMessageHeader()}
        <p className="text-sm py-3 text-gray-900">{message.text}</p>
    </div>;
  };
  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start text-left": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        <div>{rendermessageContent()}</div>
        {isCurrentUserSender && renderAvatar()}
      </div>
        <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageBox;
