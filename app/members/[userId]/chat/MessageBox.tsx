import { MessageDto } from "@/types";
import React from "react";
import clsx from "clsx";
import { Avatar } from "@heroui/react";
import { transformImgUrl } from "@/lib/util";

type Props = {
  message: MessageDto;
  currentUserId: string;
};
const MessageBox = ({ message, currentUserId }: Props) => {
  const isCurrentUserSender = message.senderId === currentUserId;

  const renderAvatar = () => {
    return (
      <Avatar
        name={message.senderName}
        className="self-end"
        src={transformImgUrl(message.senderImage!) || "/images/user.png"}
      />
    );
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
        <div >content</div>
        {isCurrentUserSender && renderAvatar()}
      </div>
    </div>
  );
};

export default MessageBox;
