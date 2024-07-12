import prisma from "@/libs/prismadb";
interface IParams {
  productId?: string;
}
export default async function getProductById({ productId }: IParams) {
  try {
    const products = await prisma?.product.findUnique({
      where: { id: productId },
      include: {
        Reviews: {
          include: {
            user: { select: { name: true, email: true, image: true } },
          },
          orderBy: {
            rating: "desc",
          },
        },
      },
    });
    if (!products) return null;
    return products;
  } catch (err: any) {
    throw new Error(err);
  }
}
