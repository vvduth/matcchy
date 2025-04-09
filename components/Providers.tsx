'use client'
 
import { useNotificationChannel } from "@/hooks/useNotifycationChannel";
import { usePresentChannel } from "@/hooks/usePresenceChannel";
 import { HeroUIProvider } from "@heroui/react";
 import { ReactNode } from "react";
 import {ToastContainer} from "react-toastify"
 import 'react-toastify/dist/ReactToastify.css'
 export default function Providers({children, userId}: {children: ReactNode, userId: string | null}) {
  usePresentChannel() 
  useNotificationChannel(userId)
  return (
     <HeroUIProvider>
      <ToastContainer position="bottom-right" hideProgressBar className={'z-50'}  />
         {children}
     </HeroUIProvider>
   )
 }