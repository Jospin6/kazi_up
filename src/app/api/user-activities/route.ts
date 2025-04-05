import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    const data = await req.json();

    const {
        type,
        yearStart,
        yearEnd,
        title,
        company,
        url,
        email,
        description,
        userId
    } = data;

    const activityData: any = {
        type,
        userId,
        ...(yearStart && { yearStart }),
        ...(yearEnd && { yearEnd }),
        ...(title && { title }),
        ...(company && { company }),
        ...(url && { url }),
        ...(email && { email }),
        ...(description && { description }),
    };

    try {
        const newActivity = await prisma.userActivity.create({
            data: activityData
        });

        const filtered = Object.fromEntries(
            Object.entries(newActivity).filter(([_, v]) => v !== null && v !== undefined)
        );

        return NextResponse.json(filtered, { status: 201 });
    } catch (error) {
        console.error("POST /user-activity error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
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