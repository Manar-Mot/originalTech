import { getCurrentUser } from "@/services/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const productDeleted = await prisma?.product.delete({
    where: {
      id: params.productId,
    },
  });
  return NextResponse.json(productDeleted);
}
