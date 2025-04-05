
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const user = await prisma.user.findUnique({
        where: {id: userId!}
    })

    const avatarBuffer = user?.avatar
    const mimeType = 'image/png'

    const headers = new Headers({ 'Content-Type': mimeType });

    return new NextResponse(avatarBuffer, { headers });
}