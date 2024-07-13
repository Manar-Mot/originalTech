import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";


interface IProductParams {
  category?: string;
  searchTerm?: string;
  color?: string;
  page?: string;
  maxPrice?: string;
  minPrice?: string;
  isNew?: boolean;
}

interface IProductResult {
  products: any[];
  totalPages: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params: IProductParams = {
    category: searchParams.get("category") || undefined,
    searchTerm: searchParams.get("searchTerm") || undefined,
    color: searchParams.get("color") || undefined,
    page: searchParams.get("page") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    isNew: searchParams.get("isNew") === "true",
  };

  try {
    const { category, searchTerm, color, page, maxPrice, minPrice, isNew } =
      params;
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

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      maxPrice &&
      minPrice
    ) {
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

    return NextResponse.json({ products, totalPages });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
