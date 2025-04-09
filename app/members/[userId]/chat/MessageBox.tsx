'use client'
import { MessageDto } from "@/types";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { Avatar } from "@heroui/react";
import { timeAgo, transformImgUrl } from "@/lib/util";
import PresenceAvatar from "@/components/PresenceAvatar";

type Props = {
  message: MessageDto;
  currentUserId: string;
};
const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = (message.senderId === currentUserId);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(( ) => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messageEndRef])

  const renderAvatar = () => {
    return (
      <div  
      className="self-end">
         <PresenceAvatar
     userId={message.senderId}
      src={transformImgUrl(message.senderImage!) || "/images/user.png"}
    />
      </div>
     
    );
  };

  const messageContentClasses = clsx(
    'flex flex-col px-2 py-1',
    {
        'rounded-l-xl rounded-tr-xl text-white bg-blue-100': isCurrentUserSender,
        'rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100': !isCurrentUserSender
    }
);
const renderMessageHeader = () => (
  <div className={clsx('flex items-center w-full', {
      'justify-between': isCurrentUserSender,
  })}>
      
      <div className='flex'>
          <span className='text-sm font-semibold text-gray-900'>{message.senderName}</span>
          
          <span className='text-sm  text-gray-500 ml-2'>{message.createdAt}</span>
      </div>
      {message.dateRead && message.recipientId !== currentUserId ? (
          <span className='text-xs text-black text-italic'> {' '}(Read {timeAgo(message.dateRead)})</span>
      ) : <div />}
  </div>
)
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
          "justify-start": !isCurrentUserSender,
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
