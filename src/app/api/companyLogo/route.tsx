
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    const job = await prisma.job.findUnique({
        where: {id: jobId!}
    })

    const companyLogoBuffer = job?.companyLogo
    const mimeType = 'image/png'

    const headers = new Headers({ 'Content-Type': mimeType });

    return new NextResponse(companyLogoBuffer, { headers });
}