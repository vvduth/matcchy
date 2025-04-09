"use client";
import React, { Key, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { useRouter, useSearchParams } from "next/navigation";
import { MessageDto } from "@/types";
import { Avatar, Button, Card } from "@heroui/react";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { deleteMessage } from "../actions/messageAction";
import { truncateString } from "@/lib/util";
import PresenceAvatar from "@/components/PresenceAvatar";
import MessageTableCell from "./MessageTableCell";
type Props = {
  messages: MessageDto[];
};
const MessageTable = ({ messages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutBox = searchParams.get("container") === "outbox";
  const [isDeleting, setIsDeleting] = useState({ id: "", loading: false });
  const columns = [
    {
      key: isOutBox ? "recipientName" : "senderName",
      label: isOutBox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "createdAt", label: isOutBox ? "Date sent" : "Date received" },
    { key: "Actions", label: "Actions" },
  ];
  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setIsDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutBox);
      router.refresh();
      setIsDeleting({ id: "", loading: false });
    },
    [isOutBox, router]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutBox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      
    },
    [isOutBox, isDeleting.id, isDeleting.loading, handleDeleteMessage]
  );
  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Message table"
        selectionMode="single"
        onRowAction={(key) => handleRowSelect(key)}
        shadow="none"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn 
            width={column.key === 'text' ? '50%' : undefined}
            key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody items={messages}>
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell
                  className={`${!item.dateRead && !isOutBox ? "font-semibold" : ""}`}
                >
                 <MessageTableCell 
                  item={item}
                  columnKey={columnKey as string}
                  isOutBox={isOutBox}
                  deleteMessage={handleDeleteMessage}
                  isDeleting={isDeleting.loading && isDeleting.id === item.id }
                 />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MessageTable;
