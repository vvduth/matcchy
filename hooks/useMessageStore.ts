import { MessageDto } from "@/types"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type MessageState = {
    messages: MessageDto[],
    add: (message: MessageDto) => void, 
    remove: (id: string) => void, 
    set: (mesages: MessageDto[]) => void
}

export const useMessageStore = create<MessageState>()(devtools((set) =>  ({
    messages: [],
    add: (message: MessageDto) => set(state => ({messages: [message, ...state.messages]})),
    remove:(id) => {
        set(state => ({messages: state.messages.filter(message => message.id !== id)}))
    },
    set:(messages) => {
        set({messages})
    },
}), {name: 'messageStoreDemo'}))