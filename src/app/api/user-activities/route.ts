import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    const { title, type, userId } = await req.json()

    try {
        const jobCategory = await prisma.userActivity.create({
            data: {
                title,
                type,
                userId, 
            }
        })
        return NextResponse.json(jobCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

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