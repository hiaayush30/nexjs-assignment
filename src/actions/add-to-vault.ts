"use server"
import { prisma } from "@/lib/prisma";

interface VaultItem {
    password: string;
    title: string;
    notes?: string;
    url?: string;
}

export const addToVault = async (userId: string, item: VaultItem) => {
    try {
        await prisma.vaultEntry.create({
            data: {
                title: item.title,
                password: item.password,
                URL: item.url,
                notes: item.notes,
                createdBy:userId
            },
        });
        return true

    } catch (error) {
        console.error("Error adding to vault:", error);
        return false;
    }
};