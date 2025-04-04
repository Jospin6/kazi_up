import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"


export async function POST(req: Request) {
    const { title, tags } = await req.json()

    try {
        const jobCategory = await prisma.jobCategory.create({
            data: {
                title,
                tags
            }
        })
        return NextResponse.json(jobCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req: Request) {
    const job_categories = await prisma.jobCategory.findMany()
    return NextResponse.json(job_categories)
}