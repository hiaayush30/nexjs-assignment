import { VaultEntry } from "@prisma/client";
import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
    interface Session {
        user: {
            email: string;
            username: string,
            id: string;
            profilePic: string;
            createdAt: Date;
            verified: boolean;
            vault: VaultEntry[];
            otp: number;
            password: string;
            customSalt: string
        } & DefaultSession['user']
    }
    interface User {
        email: string;
        username: string;
        id: string;
        profilePic: string;
        verified: boolean;
        createdAt: Date;
        otp: number;
        customSalt: string
        // vault: VaultEntry[]
        password: string;
    }

}