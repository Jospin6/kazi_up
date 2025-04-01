import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}