import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(name,email,password)
  console.log("name,email,password")
  const newUser = await prisma.user.create({
    data: { name, email, hashedPassword },
  });
  return NextResponse.json(newUser);
}
