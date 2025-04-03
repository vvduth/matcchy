'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"

export async function getMembers() {
    const session = await auth()

    if (!session?.user) {
        return null
    }
    try {
        return prisma.member.findMany({
            where: {
                NOT: {
                    userId: session.user.id 
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

export async function getMemberById(userId:string) {
    try {
        return prisma.member.findUnique({
            where: {
                userId: userId
            }
        })
    } catch (error) {
        console.log(error)
    }
    
}

export async function getMemberPhotosBuUserId(userId:string) {
    try {
        const member = await prisma.member.findUnique({
            where: {userId},
            select : {
                photos: true
            }
        })

        if (!member ) {
            return null 
        }

        return member.photos
    } catch (error) {
        console.log(error)
    }
}