'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"
import { GetMemberParamss, PaginatedResponse, UserFilters } from "@/types";
import { addYears } from "date-fns";
import { getAuthUserid } from "./authActions";
import { Member } from "@prisma/client";

export async function getMembers({
    ageRange = '18,100',
    gender= 'male,female',
    orderBy='updatedAt',
    pageNumber ='1',
    pageSize='12' ,
    withPhoto='true', 
}: GetMemberParamss ): Promise<PaginatedResponse<Member>> {
    const userId = await getAuthUserid()
    

    const[minAge, maxAge] = ageRange.split(',')
    const currentDate = new Date()
    const minDob = addYears(currentDate, -maxAge-1)
    const maxDob = addYears(currentDate, -minAge)

    const seletedGender = gender.split(',')
     

    const page = parseInt(pageNumber)
    const limit = parseInt(pageSize)

    const skip = (page - 1) * limit; 
    const photoCondition = (withPhoto === 'true') ? {image: {not: null}} : {}
    
    try {
        const count = await prisma.member.count({
            where: {
                AND: [
                    {dateOfBirth: {
                        gte: minDob, 
                        lte: maxDob
                    }},
                    {gender:  {in: seletedGender}},
                    photoCondition
                ],
                NOT: {
                    userId: userId
                }
            }
        })
        const members = await prisma.member.findMany({
            where: {
                AND: [
                    {dateOfBirth: {
                        gte: minDob, 
                        lte: maxDob
                    }},
                    {gender:  {in: seletedGender}},
                    photoCondition
                ],
                NOT: {
                    userId: userId
                }
            },
            orderBy: {
                [orderBy]: 'desc'
            },skip,
            take:limit
        });

        return {
            items: members, 
            totalCount: count
        }
    } catch (error) {
        console.log(error)
        throw error
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
        throw error
    }
}

export async function updateLastActive() {
    const userId = await getAuthUserid()

    try {
        return prisma.member.update({
            where: {userId},
            data: {updatedAt: new Date()}
        })
    } catch (error) {
        console.log(error)
        throw error

    }
}