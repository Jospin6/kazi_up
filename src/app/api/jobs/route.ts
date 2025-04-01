import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const jobs = await prisma.job.findMany()
    return NextResponse.json(jobs)
}