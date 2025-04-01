import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const companies = await prisma.company.findMany()
    return NextResponse.json(companies)
}