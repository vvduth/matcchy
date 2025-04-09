import { MessageDto } from "@/types"
import { Like } from "@prisma/client"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type LikeState = {
    likes: number
}

export const useLikeStore = create<LikeState>()(devtools((set) =>  ({
    likes: 0,
    
    updateLikeCount: (amount: number) => set(state => ({likes: state.likes + amount})),
}), {name: 'likeStore'}))