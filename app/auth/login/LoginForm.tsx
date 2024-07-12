"use client";

import { useEffect, useState } from "react";
import Input from "../../components/Inputes/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ButtonComp from "../../components/sharedComponent/ButtonComp";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CurrentUserProps } from "@/types";

const LoginForm: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in!");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  if (currentUser) {
    return <p className="text-center">Logged in Redirecting....</p>;
  }
  return (
    <>
      <h1 className=" capitalize text-xl font-semibold py-10">
        sign in to OriginalTech
      </h1>
      <ButtonComp
        outLine
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {signIn('google')}}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <ButtonComp
        label={isLoading ? "Loading.." : "Sign in"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?
        <Link className="underline" href={"/auth/register"}>
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
