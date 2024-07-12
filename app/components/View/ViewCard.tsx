import React from "react";
import Image, { StaticImageData } from "next/image";
interface ViewCardProps {
  src: StaticImageData;
  title: string;
  discount: number;
}
const ViewCard: React.FC<ViewCardProps> = ({ src, title, discount }) => {
  return (
    <div className="w-full md:w-[45%] h-[250px] overflow-hidden group relative z-20 rounded-md cursor-pointer">
      <Image
        src={src}
        alt={title}
        className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-1000 transform group-hover:scale-110"
      />
      <div className="text-white  h-full absolute  top-0 left-0 flex flex-col w-fit pl-16 justify-center ">
        <p className="text-sm text-[#d6d5d5]">{discount}% Discount</p>
        <h2 className=" font-bold text-2xl ">{title}</h2>
        <button className="w-fit mt-2 transition-all ease-linear duration-300 rounded-md py-1 px-3 shadow-lg bg-accent-10 hover:bg-[#42c0b3] text-center">
          Buy Now
        </button>
      </div>

      <div className="bg-gradient-to-r from-[rgba(255,255,255,0)] via-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.2))] -skew-x-[25deg] h-full absolute top-0 left-[-300px] w-1/2 transition-all duration-1000 transform group-hover:left-[600px] "></div>
    </div>
  );
};

export default ViewCard;
