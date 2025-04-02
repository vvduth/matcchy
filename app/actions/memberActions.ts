'use server'

import { prisma } from "@/lib/prisma"

export async function getMembers() {
    try {
        return prisma.member.findMany();
    } catch (error) {
        console.log(error)
    }
}