"use client";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { json } from "stream/consumers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ButtonComp from "../sharedComponent/ButtonComp";
import { useLoading } from "../../hooks/useLoading";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckOutClient = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    cartProducts,
    paymentIntent,
    error,
    handleSetPaymentIntent,
    handleOffError,
    handleSetError,
  } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts) {
      startLoading();
      stopLoading();
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          paymentIntentId: paymentIntent,
        }),
      })
        .then((res) => {
          stopLoading();
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((err) => {
          handleSetError();
          toast.error("something went wrong");
        });
    }
  }, [cartProducts,startLoading,stopLoading,paymentIntent,handleSetPaymentIntent,handleSetError]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <div>
      {" "}
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
      {isLoading && <div className="text-center">Loading CheckOut</div>}
      {error && (
        <div className="text-center text-rose-400"> Something went wrong</div>
      )}
      {paymentSuccess && (
        <div className=" flex flex-col items-center gap-4">
          <div className="text-green-400 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <ButtonComp
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClient;
