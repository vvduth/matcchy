import { deleteMessage, getMessageByContainer } from "@/app/actions/messageAction";
import { MessageDto } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useRef } from "react";
import { Key } from "react";
import { useMessageStore } from "./useMessageStore";
import { useShallow } from "zustand/shallow";

export const useMessages = (initialMessages: MessageDto[], nextCursor?: string) => {

  const cursorRef = useRef(nextCursor)
  const { set, remove, messages , updateUnreadCount, resetMessages} = useMessageStore(
    useShallow((state) => ({
      set: state.set,
      remove: state.remove,
      messages: state.messages,
      updateUnreadCount: state.updateUnreadCount,
      resetMessages: state.resetMessages
    }))
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOutBox = searchParams.get("container") === "outbox";
  const container =  searchParams.get("container");
  const [isDeleting, setIsDeleting] = useState({ id: "", loading: false });
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    set(initialMessages)
    cursorRef.current = nextCursor

    return () => {
        resetMessages()
    }
  },[
    initialMessages, resetMessages,set,nextCursor
  ])
  const columns = [
    {
      key: isOutBox ? "recipientName" : "senderName",
      label: isOutBox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "createdAt", label: isOutBox ? "Date sent" : "Date received" },
    { key: "Actions", label: "Actions" },
  ];

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true)
      const {messages, nextCursor} = await getMessageByContainer(container, cursorRef.current)
      set(messages)
      cursorRef.current = nextCursor
      setLoadingMore(false)
    }
  },[container, set])
  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setIsDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutBox);
      remove(message.id)
      if (!message.dateRead && !isOutBox) updateUnreadCount(-1)
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

  return {
      columns,
    isOutBox,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
    isDeleting,
    messages,
    loadMore, 
    loadingMore, 
    hasMore: !!cursorRef.current
  };
};
