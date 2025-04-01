import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const userActivity = await prisma.userActivity.findMany({
        where: {
            ...(userId ? { userId, } : {})
        },
    })
    return NextResponse.json(userActivity)
}