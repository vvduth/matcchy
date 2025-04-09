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

import { MessageDto } from "@/types";
import { Avatar, Button, Card } from "@heroui/react";

import MessageTableCell from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";
type Props = {
  initialMessages: MessageDto[];
};
const MessageTable = ({ initialMessages }: Props) => {
 const {columns, isDeleting, isOutBox, selectRow, deleteMessage, messages} = useMessages(initialMessages)
  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Message table"
        selectionMode="single"
        onRowAction={(key : any) => selectRow(key)}
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
                  deleteMessage={deleteMessage}
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
