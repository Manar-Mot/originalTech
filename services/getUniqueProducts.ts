import prisma from "@/libs/prismadb";

export interface ITopRatedProductResult {
  products: any[];
}

export default async function getTopRatedProducts(): Promise<ITopRatedProductResult> {
  try {
    const products = await prisma.product.findMany({
      include: {
        reviews: true,
      },
    });

    const productsWithAverageRating = products.map(product => {
      const averageRating = product.reviews.length
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0;
      return { ...product, averageRating };
    });

    productsWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

    const topRatedProducts = productsWithAverageRating.slice(0, 9);

    return { products: topRatedProducts };
  } catch (err: any) {
    throw new Error(err.message || "Error fetching top-rated products");
  }
}
