import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf: any = await buffer(req);
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    res.status(400).send("Missing stripe signature");
    return;
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    switch (event.type) {
      case "charge.succeeded":
        const charge: any = event.data.object as Stripe.Charge;
        if (typeof charge.payment_intent === "string") {
          await prisma?.order.update({
            where: { paymentIntentId: charge.payment_intent },
            data: { status: "complete", address: charge.shipping?.address },
          });
        }
        break;
      default:
        console.log("unhandled event type " + event.type);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    res.status(400).send("WebHook Error: " + err);
  }
}
