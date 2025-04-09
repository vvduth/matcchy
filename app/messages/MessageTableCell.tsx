import PresenceAvatar from "@/components/PresenceAvatar";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";
import { Button } from "@heroui/react";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
type Props = {
  item: MessageDto;
  columnKey: string;
  isOutBox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
};
const MessageTableCell = ({
  item,
  columnKey,
  isOutBox,
  deleteMessage,
  isDeleting,
}: Props) => {
  const cellvalue = item[columnKey as keyof MessageDto];
  switch (columnKey) {
    case "recipientName":
    case "senderName":
      return (
        <div className={`flex items-center gap-2 cursor-pointer`}>
          <PresenceAvatar
            userId={isOutBox ? item.recipientId : item.senderId}
            src={
              (isOutBox ? item.recipientImage : item.senderImage) ||
              "/images/user.png"
            }
          />
          <span>{cellvalue}</span>
        </div>
      );
    case "text":
      return <div className="truncate">{truncateString(cellvalue)}</div>;
    case "createdAt":
      return cellvalue;
    default:
      return (
        <Button
          isIconOnly
          variant="light"
          onPress={() => deleteMessage(item)}
          isLoading={isDeleting}
        >
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      );
  }
};

export default MessageTableCell;
