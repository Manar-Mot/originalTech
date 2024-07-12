import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/services/getCurrentUser";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();
  const body = await req.json();
  const { id, deliveryStatus } = body;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus:deliveryStatus },
  });
  return NextResponse.json(order);
}
