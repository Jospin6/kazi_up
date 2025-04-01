import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const company = await prisma.company.findUnique({
        where: {id,}
    })
    if (!company) {
        return NextResponse.json({message: "company not found"})
    }
    return NextResponse.json(company)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {} = await req.json()
    const company = await prisma.company.update({
        where: {id,},
        data: {}
    })
    return NextResponse.json(company)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.company.delete({where: {id,}})
}