
import { transformImgUrl } from '@/lib/util'
import { MessageDto } from '@/types'
import { Image } from '@heroui/react'
import { Like, Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'


type Props = {
    sourceMember: Member
}
const NewLikeToast = ({sourceMember}: Props) => {
 
   
    if (!sourceMember ){
        return null
    }
  return (
    <Link href={`/members/${sourceMember.userId}`

    } className='flex items-center'>
        <Image 
            src={transformImgUrl(sourceMember.image!) || '/images/user.png'}
            alt='sender image'
            width={50}
        />
        <div className='flex flex-grow flex-col justify-center'>
            <div className='font-semibold '>{sourceMember.name} liked you</div>
            <div className='text-xs'>Click to view</div>
        </div>
    </Link>
  )
}

export const newLikeToast = (sourceMember: Member) => {
    toast(<NewLikeToast  sourceMember={sourceMember}/>)
}