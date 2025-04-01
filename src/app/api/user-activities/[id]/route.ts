import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const userActivity = await prisma.userActivity.findUnique({
        where: {id,}
    })
    if (!userActivity) {
        return NextResponse.json({message: "userActivity not found"})
    }
    return NextResponse.json(userActivity)
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const {} = await req.json()
    const userActivity = await prisma.userActivity.update({
        where: {id,},
        data: {}
    })
    return NextResponse.json(userActivity)
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.userActivity.delete({where: {id,}})
}