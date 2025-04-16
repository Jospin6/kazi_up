import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const job = await prisma.job.findUnique({
        where: {id,},
        include: {
            View: true,
            Applied: true
        }
    })
    if (!job) {
        return NextResponse.json({message: "job not found"})
    }
    return NextResponse.json(job)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {} = await req.json()
    const job = await prisma.job.update({
        where: {id,},
        data: {}
    })
    return NextResponse.json(job)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.job.delete({where: {id,}})
}