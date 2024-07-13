import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProduct } from "@/app/components/ProductDetails/types";
import { getCurrentUser } from "@/services/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateServerAmount = (items: CartProduct[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const totalPriceForItem = item.price * item.quantity;
    return acc + totalPriceForItem;
  }, 0);
  return Math.floor(totalPrice);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, paymentIntentId } = body;
  const total = calculateServerAmount(items) * 100;
  const order = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: paymentIntentId,
    products: items,
  };

  if (paymentIntentId) {
    const currentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: total,
      });

      const [existingOrder, updatedOrder] = await Promise.all([
        prisma.order.findFirst({ where: { paymentIntentId: paymentIntentId } }),
        prisma.order.update({
          where: { paymentIntentId: paymentIntentId },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existingOrder) {
        return NextResponse.json({ error: "invalid Payment intent" }, { status: 400 });
      }
      return NextResponse.json({ paymentIntent: updatedIntent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    order.paymentIntentId = paymentIntent.id;
    await prisma.order.create({
      data: order,
    });
    return NextResponse.json({ paymentIntent });
  }

  // If none of the above branches return, return an error response
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
