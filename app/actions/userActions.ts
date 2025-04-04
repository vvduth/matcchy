'use server'

import { memberEditSchema, MemberEditSchema } from "@/lib/memberEditSchema"
import { ActionResult } from "@/types"
import { Member } from "@prisma/client"
import { getAuthUserid } from "./authActions"
import { prisma } from "@/lib/prisma"

export async function updateMemberProfile(memberId: string, data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserid()

        const validated = memberEditSchema.safeParse(data)
        if (!validated.success) {return {status: 'error', error: validated.error.errors}}

        const { name, description, city, country } = validated.data

        const member = await prisma.member.update({
            where: {
                userId: userId,
            },
            data: {
                name,
                description,
                city,
                country,
            }
        })
        return {status: 'success', data: member}

    } catch (error) {
        console.log(error)
        return {status: 'error', error: 'Something went wrong'}
    }
}

export async function addImage(url:string, pulicId: string){
   try {
     const userId = await getAuthUserid()

     return await prisma.member.update({
        where: {
            userId: userId,
        },
        data: {
            photos: {
                create:[ {
                    url,
                    publicId: pulicId
                }]
            }
        }
     })
   } catch (error) {
    console.log(error)
        throw error
   }
    
}