import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: Request) {
    const job_categories = await prisma.job_category.findMany()
    return NextResponse.json(job_categories)
}