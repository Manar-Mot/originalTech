"use client";
import { IProductParams } from "@/services/getProducts";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BiCloset } from "react-icons/bi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdClose } from "react-icons/md";

const SearchComponent = ({isOpen,handleOpenSearchModal}:{isOpen:boolean,handleOpenSearchModal:()=>void}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());

    if (data.searchTerm !== null && data.searchTerm) {
      params.set("searchTerm", data.searchTerm);
      router.push("/store" + "?" + params.toString());
    }
  };

  return (
    <div className={` fixed transition-all ease-linear duration-75 w-full flex flex-col items-center z-[1000] border-b shadow-md border-slate-200  h-[200px] bg-white ${isOpen?"   top-0 left-0":"  -top-[400px] left-0   "}`}>
      <MdClose size={20} onClick={handleOpenSearchModal} className="absolute top-4 left-4 cursor-pointer"/>
    <div className="flex items-center h-10 w-[80%] mt-20">
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Search here..."
        className="focus:border-[#7142bd] outline-none  h-full bg-white text-gray-800 border border-slate-400 w-full px-4 py-1 rounded-l-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="border-purple-500 bg-[#a170f0] h-full flex items-center px-2 rounded-r-md"
        onClick={handleSubmit(onSubmit)}
      >
        <HiMagnifyingGlass className="text-white text-2xl mx-2 cursor-pointer" />
      </button>
    </div>
    </div>
  );
};

export default SearchComponent;
