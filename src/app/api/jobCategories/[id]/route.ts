import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const job_category = await prisma.jobCategory.findUnique({
        where: {id,}
    })
    if (!job_category) {
        return NextResponse.json({message: "job_category not found"})
    }
    return NextResponse.json(job_category)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {} = await req.json()
    const job_category = await prisma.jobCategory.update({
        where: {id,},
        data: {}
    })
    return NextResponse.json(job_category)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.jobCategory.delete({where: {id,}})
}