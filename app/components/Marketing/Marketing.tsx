import React from "react";
import Image from "next/image";
import Link from "next/link";
import a from "../../../public/assets/images/MarkettingBanner.jpg";
import { marketingBanner } from "@/public/assets";
const Marketing = () => {
  return (
    <section className="relative w-[90%] h-32 md:h-40 mx-auto cursor-pointer overflow-hidden my-10 rounded-2xl bg-cover bg-center">
      <Link href="/categories/mobiles">
        <Image
          src={marketingBanner}
          alt="banner"
          className="transition-all   object-fill  ease-in duration-300 w-full h-full transform hover:scale-x-[1.01]"
          placeholder="blur"
        />
        <div className=" flex flex-col gap-2 justify-center items-center pointer-events-none text-center absolute w-full h-full   top-0 left-0  text-white">
          <p className="  text-xs md:text-sm ">Up to 60% off on devices</p>
          <h2 className="font-semibold text-sm md:text-lg max-w-[100px] md:max-w-[300px] leading-loose ">
            New arrivals in mobiles
          </h2>
        </div>
      </Link>
    </section>
  );
};

export default Marketing;
