'use client'
import { toogleLikeMember } from '@/app/actions/likeAction'
import { useRouter } from 'next/navigation'
import React from 'react'
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"

type Props = {
    targetId: string, 
    hasLiked: boolean
}
const LikeButton = ({targetId, hasLiked}: Props) => {

    const router = useRouter()

    async function toggleLike() {
        await toogleLikeMember(targetId, hasLiked)
        router.refresh()
    }
  return (
    <div onClick={toggleLike} className='relative hover:opacity-80 cursor-pointer 
    transition'>
        <AiOutlineHeart 
            size={28} 
             className='fill-white absolute -top-[2px] -right-[2px]'

        />
        <AiFillHeart 
        size={24} 
        className={hasLiked ? 'fill-rose-600' : 'fill-neutral-500/70'}
        />
    </div>
  )
}

export default LikeButton