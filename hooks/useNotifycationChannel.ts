import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { useMessageStore } from "./useMessageStore";
import { toast } from "react-toastify";
import { newMessageToast } from "@/components/NewMessageToast";
import { newLikeToast } from "@/components/NewLikeToast";
import { Like, Member } from "@prisma/client";

export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);
  const channelLikeRef  = useRef<Channel | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const  add  = useMessageStore((state) => state.add );
  const  updateUnreadCount  = useMessageStore((state) => state.updateUnreadCount );


  const handleNewMessage = useCallback((message: MessageDto) => {
    if (
      pathname === "/messages" &&
      searchParams.get("container") !== "outbox"
    ) {
      add(message)
      updateUnreadCount(1)
    } else if (pathname !== `/member/${message.senderId}/chat`) {
      newMessageToast(message)
      console.log('yo')
      updateUnreadCount(1)
    }
  }, [add, pathname, searchParams ]);

  const handleNewLike = useCallback((sourceMember: Member) => {
    newLikeToast(sourceMember)
  },[])

  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);
      channelLikeRef.current = pusherClient.subscribe(`private-like-${userId}`);
      //`private-like-${targetUserId}`
      channelRef.current.bind('message:new', handleNewMessage)
      channelLikeRef.current.bind('like:new', handleNewLike)
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind_all();
        channelRef.current = null;
        
      }
      if (channelLikeRef.current) {
        channelLikeRef.current.unsubscribe();
        channelLikeRef.current.unbind_all();
        channelLikeRef.current = null;
      }
    };
  }, [userId, handleNewMessage, handleNewLike]);
};
