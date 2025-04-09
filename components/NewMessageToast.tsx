import { transformImgUrl } from '@/lib/util'
import { MessageDto } from '@/types'
import { Image } from '@heroui/react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'


type Props = {
    message: MessageDto
}
const NewMessageToast = ({message}: Props) => {
  return (
    <Link href={`/members/${message.senderId}/chat`

    } className='flex items-center'>
        <Image 
            src={transformImgUrl(message.senderImage!) || '/images/user.png'}
            alt='sender image'
            width={50}
        />
        <div className='flex flex-grow flex-col justify-center'>
            <div className='font-semibold '>{message.senderName} sent you a mesage</div>
            <div className='text-xs'>Click to view</div>
        </div>
    </Link>
  )
}

export const newMessageToast = (message: MessageDto) => {
    toast(<NewMessageToast  message={message}/>)
}