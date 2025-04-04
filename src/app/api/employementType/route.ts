import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
    const { title } = await req.json()

    try {
        const employementType = await prisma.employement_Type.create({
            data: {
                title,
            }
        })
        return NextResponse.json(employementType, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const employementType = await prisma.employement_Type.findMany()
    return NextResponse.json(employementType)
}