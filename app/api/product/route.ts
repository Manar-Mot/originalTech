import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/getCurrentUser";
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { name, description, price, brand, category, inStock, images } = body;
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  });
  return NextResponse.json(newProduct);
}
export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { id, inStock } = body;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const newProduct = await prisma.product.update({
    where: { id: id },
    data: { inStock },
  });
  return NextResponse.json(newProduct);
}
