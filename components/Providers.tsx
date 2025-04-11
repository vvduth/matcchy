'use client'
 
import { getUnreadMesagesCount } from "@/app/actions/messageAction";
import { useMessageStore } from "@/hooks/useMessageStore";
import { useNotificationChannel } from "@/hooks/useNotifycationChannel";
import { usePresentChannel } from "@/hooks/usePresenceChannel";
 import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
 import { ReactNode, useCallback, useEffect } from "react";
 import {ToastContainer} from "react-toastify"
 import 'react-toastify/dist/ReactToastify.css'
 export default function Providers({children, userId, profileComplete}: {children: ReactNode,
  profileComplete: boolean, userId: string | null}) {
  
  const updateUnreadCount = useMessageStore(state => state.updateUnreadCount);

  const setUnreadCount = useCallback((amount: number) => {
    updateUnreadCount(amount)
  }, [updateUnreadCount])

  useEffect(() => {
    if (userId) {
      getUnreadMesagesCount().then(count => {

        setUnreadCount(count)
      })
    }
  }, [setUnreadCount, userId]);

  usePresentChannel(userId, profileComplete) 
  useNotificationChannel(userId, profileComplete)
  
  return (
    <SessionProvider>
      <HeroUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar className={'z-50'}  />
         {children}
     </HeroUIProvider>
    </SessionProvider>
   )
 }