import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    try {
        const vaultEntries = await prisma.vaultEntry.findMany({
            where: { createdBy: userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(vaultEntries);
    } catch (error) {
        console.error("Error fetching vault:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
