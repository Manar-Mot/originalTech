"use client";
import Input from "@/app/components/Inputes/Input";
import TextArea from "@/app/components/Inputes/TextArea";
import ButtonComp from "@/app/components/sharedComponent/ButtonComp";
import Heading from "@/app/components/sharedComponent/Header";
import { useLoading } from "@/app/hooks/useLoading";
import { safeUser } from "@/types";
import { Rating } from "@mui/material";
import { Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface AddRatingProps {
  product: Product & {
    Reviews: Review[];
  };
  user: safeUser | null;
}
const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    startLoading();
    if (data.rating === 0) {
      stopLoading();
      return toast.error("No rating specified");
    }
    const ratingData = { ...data, userId: user?.id, product: product };
    axios
      .post(`/api/rating`, ratingData)
      .then((response) => {
        toast.success("Rating submitted ");
        reset();
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        stopLoading();
        reset()
      });

  };
  // if (!user || !product) return null;
  const deliveredOrder = user?.orders?.some((order) => {
    return (
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus !== "delivered"
    );
  });
  const userReview = product?.Reviews?.some((review: Review) => {
    return review.userId === user?.id;
  });
  // console.log(deliveredOrder);
  // if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2  px-2 mt-8">  
      <div className=" w-full flex gap-2 items-center justify-between ">
        <div className=" flex gap-2 items-center">
          <Rating
            onChange={(event, newValue) => {
              setCustomValue("rating", newValue);
            }}
            precision={0.5}
          />
          <span className="text-slate-400  text-sm">
            ({watch("rating")} star){" "}
          </span>
        </div>
        <div className=" ">
          <ButtonComp
            label={isLoading ? "Loading..." : "Rate Product"}
            onClick={handleSubmit(onSubmit)}
            small
          />
        </div>
      </div>
      <TextArea
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default AddRating;
