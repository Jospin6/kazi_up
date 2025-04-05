import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma"
import { Buffer } from "buffer";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    const user = await prisma.user.findUnique({
        where: {id,},
        include: {
          UserActivity: true
        }
    })
    if (!user) {
        return NextResponse.json({message: "User not found"})
    }
    return NextResponse.json(user)
}


export async function PUT(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

  const formData = await req.formData();

  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string | null;
    const residencyCountry = formData.get("residencyCountry") as string | null;
    const nationality = formData.get("nationality") as string | null;
    const gender = formData.get("gender") as string | null;
    const website = formData.get("website") as string | null;
    const github = formData.get("github") as string | null;
    const twitter = formData.get("twitter") as string | null;
    const linkedin = formData.get("linkedin") as string | null;
    const bio = formData.get("bio") as string | null;
    const skills = formData.get("skills") as string | null;
    const languages = formData.get("languages") as string | null;
    const available = formData.get("available") as string | null;
    const timezone = formData.get("timezone") as string | null;
    const annualpay = formData.get("annualpay") as string | null;
    const hourlypay = formData.get("hourlypay") as string | null;

    const avatarFile = formData.get("avatar") as File | null;
    let avatarBuffer: Buffer | null = null;

    if (avatarFile && typeof avatarFile.arrayBuffer === "function") {
      const arrayBuffer = await avatarFile.arrayBuffer();
      avatarBuffer = Buffer.from(arrayBuffer);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        location,
        residencyCountry,
        nationality,
        gender,
        website,
        github,
        twitter,
        linkedin,
        bio,
        skills,
        languages,
        available,
        timezone,
        annualpay,
        hourlypay,
        avatar: avatarBuffer,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop() as string
    await prisma.user.delete({where: {id,}})
}