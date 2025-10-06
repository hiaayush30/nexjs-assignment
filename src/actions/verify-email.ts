"use server"

import { prisma } from "@/lib/prisma"

export const verifyEmail = async (id:string) => {
    await prisma.user.update({
        where: {
            id
        },
        data: {
            verified: true
        }
    })
}