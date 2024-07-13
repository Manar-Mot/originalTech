"use client";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../utils";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ButtonComp from "../sharedComponent/ButtonComp";
import { useLoading } from "../../hooks/useLoading";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  handleSetPaymentSuccess,
  clientSecret,
}) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { cartTotalQty, handleClearCard, handleSetPaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const formatedPrice = formatPrice(cartTotalQty);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    startLoading();

    await stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("CheckOut Success ");
          handleClearCard();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
      });
    stopLoading();
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6 ">
        <h1 className=" capitalize text-xl font-semibold py-10">
          Enter Your Details to complete CheckOut
        </h1>
        <h2 className="font-semibold  mb-2 ">Address Information</h2>
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["us", "KE"] }}
        />
        <h2 className="font-semibold mt-4 mb-2 ">Payment Information</h2>
        <PaymentElement id="pyment-element" options={{ layout: "tabs" }} />
        <div className="py-4 text-center text-slate-700 font-bold text-xl">
          Total:{formatedPrice}
        </div>
        <ButtonComp
          label={isLoading ? "processing..." : "Pay now"}
          disabled={isLoading || !stripe || !elements}
          custom="font-base"
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
