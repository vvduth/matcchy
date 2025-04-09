"use client";
import { MessageDto } from "@/types";
import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/lib/pusher";
import { formatShortDate } from "@/lib/util";
import { Channel } from "pusher-js";
import { useMessageStore } from "@/hooks/useMessageStore";

type Props = {
  intitalMessages: { messages: MessageDto[]; readCount: number };
  currentuserId: string;
  chatId: string;
};
const MessageList = ({ intitalMessages, currentuserId, chatId }: Props) => {
  const setReadCount = useRef(false);
  const channelRef = useRef<Channel | null>(null);
  const [messages, setMessages] = useState(intitalMessages.messages);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  useEffect(() => {
    if (!setReadCount.current) {
      updateUnreadCount(-intitalMessages.readCount);
      setReadCount.current = true;
    }
  }, [intitalMessages.readCount, updateUnreadCount]);
  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevState) =>
      prevState.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDate(new Date()) }
          : message
      )
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);
      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind("messages:read", handleReadMessages);
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);
  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentuserId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;
