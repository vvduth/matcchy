import {z} from "zod"

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Password must more than 6 characters'
    }),
    name: z.string().min(3)
})

export type RegisterSchema = z.infer<typeof registerSchema>