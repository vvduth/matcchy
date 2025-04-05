
import {z} from 'zod'

export const messageSchema = z.object({
    text    : z.string().min(1, {
        message: 'Message cannot be empty',
    }),
})

export type MessageSchema = z.infer<typeof messageSchema>