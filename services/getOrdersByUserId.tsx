import prisma from "@/libs/prismadb";
export default async function getOrdersByUserId(id: string) {
  try {
    const orders = await prisma?.order.findMany({
      where: { userId: id },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}
