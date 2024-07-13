import { HiMiniWallet } from "react-icons/hi2";
import { BiWallet } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { FaUndoAlt } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import Container from "../sharedComponent/Container";
import Image from "next/image";
import { lines } from "@/public/assets";

const Services = () => {
  return (
    <div className=" pt-10 pb-20 bg-[#f8f8f8]  w-full relative overflow-hidden   ">
      {/* <div
          className="w-[400px] h-[400px] rounded-full absolute left-0 top-0 border-[0.5px]
           border-purple-100 bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgb(161,112,240,0.2)_50%)]"
        ></div> */}
      <div className=" text-[28px] md:text-[36px] lg:text-[42px] text-secondary-30 mx-auto w-fit font-semibold mb-10">
      Our Services
      </div>

      <div className="w-[90%] mx-auto relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  items-center">
        <ServiceCard
          title="Money Back Guarantee"
          description="Guarantee up to one year"
          Icon={
            <FaUndoAlt className="text-4xl md:my-2 text-[rgb(161,112,240)] tranform transition-all ease-linear duration-500 group-hover:rotate-[360deg]" />
          }
        />
        <ServiceCard
          title="High-Quality Products"
          description="Enjoy high-quality products at affordable prices"
          Icon={
            <FiCheckCircle className="text-4xl md:my-2 text-red-300 tranform transition-all ease-linear duration-500 group-hover:scale-110" />
          }
        />
        <ServiceCard
          title="Online Support"
          description="Get support anytime, anywhere"
          Icon={
            <BiWallet className="text-4xl md:my-2 text-yellow-400 tranform transition-all ease-linear duration-500 group-hover:scale-75" />
          }
        />

        <ServiceCard
          title="Fast Shipping"
          description="Get your products delivered quickly"
          Icon={
            <HiMiniWallet className="text-4xl md:my-2 text-blue-500 tranform transition-all ease-linear duration-500 group-hover:scale-90" />
          }
        />
      </div>
    </div>
  );
};

export default Services;
