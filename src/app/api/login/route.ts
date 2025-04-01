import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../prisma/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET || "secret_key";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    throw new Error('Incorrect password')
  }

  const token = jwt.sign({ 
    id: user.id, 
    email: user.email, 
    name: user.name }, SECRET_KEY);

  
  const response = NextResponse.json({ message: "Connexion successful" }, { status: 200 });

  (await cookies()).set("token_kup", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 100 * 365 * 24 * 60 * 60, 
  });
  return response;
}