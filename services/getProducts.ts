import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
  page?: string | null;
  color?: string | null;
  maxPrice?: string | null;
  minPrice?: string | null;
  isNew?: boolean | null;
}

export interface IProductResult {
  products: any[];
  totalPages: number;
}


export default async function getProducts(
  params: IProductParams
): Promise<IProductResult> {
  try {
    const { category, searchTerm, color, page, maxPrice, minPrice, isNew } = params;
    const pageSize = 4;
    let searchString = searchTerm || "";
    const skip = (page && +page > 0 ? +page - 1 : 0) * pageSize || 0;
    let query: any = {};
    if (category) {
      query.category = category;
    }
    if (color) {
      query.images = {
        some: {
          color: color,
        },
      };
    }

    if (minPrice !== undefined && maxPrice !== undefined&&maxPrice&&minPrice) {
      const minPriceFloat = parseFloat(minPrice);
      const maxPriceFloat = parseFloat(maxPrice);

      
      if (!isNaN(minPriceFloat) && !isNaN(maxPriceFloat)) {
        query.price = {
          gte: minPriceFloat,
          lte: maxPriceFloat,
        };
      }
    }
    if (isNew) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      query.createdAt = {
        gte: threeMonthsAgo,
      };
    }
    const totalCount = await prisma.product.count({
      where: {
        ...query,
        name: {
          contains: searchString,
          mode: "insensitive",
        },
      },
    });
    const totalPages = Math.ceil(totalCount / pageSize);
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
      skip,
      take: pageSize,
    });

    return { products, totalPages };
  } catch (err: any) {
    throw new Error(err);
  }
}

