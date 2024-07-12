import prisma from '@/libs/prismadb';

interface TotalSales {
  _sum: {
    amount: number | null;
  };
}

interface BrandSales {
  brand: string;
  _sum: {
    amount: number | null;
  };
}

interface DailySales {
  createdAt: Date;
  _sum: {
    amount: number | null;
  };
}

interface ProductSales {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SummaryData {
  totalSales: TotalSales;
  dailySales: DailySales[];
  productSales: ProductSales[];
  brandSales: BrandSales[];
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  pendingOrders: number;
  paidOrders: number;
  deliveryRequestedOrders: number;
  deliveredOrders: number;
  outOfStockProducts: number;
}

export async function getSummary(): Promise<SummaryData> {
  const totalSales = await prisma.order.aggregate({
    _sum: {
      amount: true,
    },
  });

  const dailySales = await prisma.order.groupBy({
    by: ['createdAt'],
    _sum: {
      amount: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const formattedDailySales = dailySales.map(sale => ({
    createdAt: new Date(sale.createdAt),
    _sum: sale._sum,
  }));

  const productSales = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  const orders = await prisma.order.findMany({
    where: { status: 'complete' },
    select: {
      products: {
        select: {
          brand: true,
          price: true,
        },
      },
    },
  });

  const brandSalesMap: { [key: string]: number } = {};

  orders.forEach(order => {
    order.products.forEach(product => {
      if (brandSalesMap[product.brand]) {
        brandSalesMap[product.brand] += product.price;
      } else {
        brandSalesMap[product.brand] = product.price;
      }
    });
  });

  const formattedBrandSales = Object.entries(brandSalesMap).map(([brand, amount]) => ({
    brand,
    _sum: { amount },
  }));

  const totalOrders = await prisma.order.count();
  const totalUsers = await prisma.user.count();
  const totalProducts = await prisma.product.count();

  const pendingOrders = await prisma.order.count({
    where: { status: 'pending' },
  });

  const paidOrders = await prisma.order.count({
    where: { status: 'paid' },
  });

  const deliveryRequestedOrders = await prisma.order.count({
    where: { deliveryStatus: 'requested' },
  });

  const deliveredOrders = await prisma.order.count({
    where: { deliveryStatus: 'delivered' },
  });

  const outOfStockProducts = await prisma.product.count({
    where: { inStock: false },
  });

  return {
    totalSales,
    dailySales: formattedDailySales,
    productSales,
    brandSales: formattedBrandSales,
    totalOrders,
    totalUsers,
    totalProducts,
    pendingOrders,
    paidOrders,
    deliveryRequestedOrders,
    deliveredOrders,
    outOfStockProducts,
  };
}
