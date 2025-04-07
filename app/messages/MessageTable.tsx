"use client";
import React, { Key } from "react";
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

type Props = {
  messages: MessageDto[];
};
const MessageTable = ({ messages }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const isOutBox = searchParams.get("container") === "outbox";
  const columns = [
    {
      key: isOutBox ? 'recipientName' : 'senderName',
      label: isOutBox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "createdAt", label: isOutBox ? "Date sent" : "Date received" },
  ];

  const handleRowSelect = (key: Key) => {
    const message = messages.find(m => m.id === key)
    const url = isOutBox ? `/members/${message?.recipientId}` : `/member/${message?.senderId}`
    router.push(url+ '/chat')
  }
  return (
    <Table aria-label="Message table"
    selectionMode="single"
    onRowAction={(key) => handleRowSelect(key)}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={messages}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MessageTable;
