import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma"

export async function POST(req: Request) {
  const formData = await req.formData();

  try {
    const position = formData.get("position") as string;
    const companyName = formData.get("companyName") as string;
    const description = formData.get("description") as string;
    const jobCategoryId = formData.get("jobCategoryId") as string;
    const primaryTag = formData.get("primaryTag") as string;
    const tags = formData.get("tags") as string;
    const jobRestricted = formData.get("jobRestricted") as string;
    const userId = formData.get("userId") as string;
    const employementTypeId = formData.get("employementTypeId") as string;
    const remote = formData.get("remote") as string;
    const howToApply = formData.get("howToApply") as string | null;
    const salaryRange = formData.get("salaryRange") as string | null;
    const website = formData.get("website") as string | null;

    const file = formData.get("companyLogo") as File | null;
    let companyLogoBuffer: Buffer | null = null;

    if (file) {
      companyLogoBuffer = Buffer.from(await file.arrayBuffer());
    }

    const job = await prisma.job.create({
      data: {
        position,
        companyName,
        description,
        jobCategoryId,
        primaryTag,
        tags,
        jobRestricted,
        userId,
        employementTypeId,
        remote,
        howToApply,
        salaryRange,
        website,
        companyLogo: companyLogoBuffer,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error while creating job :", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const skip = (page - 1) * limit;

  const jobs = await prisma.job.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(jobs);
}