import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import {useShallow} from 'zustand/shallow'
import { updateLastActive } from "@/app/actions/memberActions";
export const usePresentChannel = (userId: string| null,profileComplete: boolean) => {
  const { set, add, remove } = usePresenceStore(
    useShallow(
    (state) => ({
    set: state.set,
    add: state.add,
    remove: state.remove,
  })));

  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberids: string[]) => {
      set(memberids);
    },
    [set]
  );

  const handleAddMembers = useCallback(
    (memberid: string) => {
      add(memberid);
    },
    [add]
  );
  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );
  useEffect(() => {
    if (!userId || !profileComplete) {
      return 
    }
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-nm");
      channelRef.current.bind(
        "pusher:subscription_succeeded",
        async(members: Members) => {
            handleSetMembers(Object.keys(members.members))
            await updateLastActive()
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
            handleAddMembers(member.id)
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
            handleRemoveMember(member.id)
        }
      );
    }

    return ( ) => {
        if (channelRef.current && channelRef.current.subscribed) {
            channelRef.current.unsubscribe();
            channelRef.current.unbind_all()
        }
    }
  }, [handleAddMembers, handleRemoveMember, handleSetMembers, userId, profileComplete]);
};
