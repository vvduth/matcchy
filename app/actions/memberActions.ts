'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { UserFilters } from "@/types";
import { addYears } from "date-fns";

export async function getMembers(searchParams: UserFilters ) {
    const session = await auth()

    if (!session?.user) {
        return null
    }

    const agerange = searchParams?.ageRange?.toString().split(',') || [18,100]
    const currentDate = new Date()
    const minDob = addYears(currentDate, -agerange[1]-1)
    const maxDob = addYears(currentDate, -agerange[0])

    try {
        return prisma.member.findMany({
            where: {
                AND: [
                    {dateOfBirth: {
                        gte: minDob, 
                        lte: maxDob
                    }}
                ],
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