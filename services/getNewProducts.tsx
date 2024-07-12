import prisma from "@/libs/prismadb";

export interface INewProductResult {
  products: any[];
}

export default async function getNewProducts(): Promise<INewProductResult> {
  try {
  
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const products = await prisma.product.findMany({
      where: {
        createdAt: {
          gte: threeMonthsAgo,
        },
      },
      take:11
    });

    return { products };
  } catch (err: any) {
    throw new Error(err.message || "Error fetching new products");
  }
}
