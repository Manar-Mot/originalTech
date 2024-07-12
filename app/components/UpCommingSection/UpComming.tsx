import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UpComming2, ribbon } from "@/public/assets";
import { UpComming1 } from "@/public/assets";
import CounterComp from "./CounterComp";
import { FaRegCheckCircle } from "react-icons/fa";
import Container from "../sharedComponent/Container";
const UpComming = () => {
  return (
    <div className="bg-[#f8f8f8] w-full py-10">
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-10 my-14  w-[90%] mx-auto">
        <Link
          href="# "
          className=" shadow-lg border-[0.5px] md:col-span-3 xl:col-span-2   cursor-pointer flex flex-col md:flex-row items-center justify-center bg-[#f6f6f6]"
        >
          <Image
            src={UpComming2}
            alt="UpComming2"
            className="w-[100%] h-full object-contain "
          />
          <div className=" lg:max-w-[50%] h-full p-10 bg-white flex flex-col justify-center gap-4">
            <h2 className="text-md font-semibold text-slate-600">
              Dummy Product Name
            </h2>
            <p className="text-sm text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elitest, sed
              do eiusmod tempor incididunt ut labore et dolores top magna
              aliqua. Ut enim ad minim veniam, quis nostrud exer citation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. laborum.
            </p>

            <div className="flex items-center gap-4">
              <div>
                <CounterComp count={44} standard="days" />
              </div>
              <div>
                <CounterComp count={33} standard="hour" />
              </div>
              <div>
                <CounterComp count={44} standard="min" />
              </div>
              <div>
                <CounterComp count={55} standard="sec" />
              </div>
            </div>
          </div>
        </Link>
        <Link
          href="#"
          className="hidden md:flex items-center w-full h-full  bg-white border-[0.5px]  relative  shadow-lg"
        >
          <div className="  flex flex-col justify-center gap-8 pl-6">
            <h2 className="text-lg font-thin text-slate-600 transition-all duration-75 ease-linear cursor-pointer hover:text-accent-10">
              Product Name
            </h2>
            <ul className="text-sm text-slate-500 flex flex-col justify-center gap-2">
              <li className="flex items-center gap-2 ">
                <FaRegCheckCircle className="text-accent-10" />
                <p>Lorem ipsum </p>
              </li>
              <li className="flex items-center gap-2 ">
                <FaRegCheckCircle className="text-accent-10" />
                <p>amet, consectetur</p>
              </li>
              <li className="flex items-center gap-2 ">
                <FaRegCheckCircle className="text-accent-10" />
                <p>eiusmod tempor</p>
              </li>
              <li className="flex items-center gap-2 ">
                <FaRegCheckCircle className="text-accent-10" />
                <p>adipisicing elitest,</p>
              </li>
              <li className="flex items-center gap-2 ">
                <FaRegCheckCircle className="text-accent-10" />
                <p>labore et dolore.</p>
              </li>
            </ul>
          </div>

          <Image
            src={ribbon}
            alt="ribbon"
            className="  absolute -top-2 -left-8 w-40 h-28  object-contain z-1"
          />
          <span className=" absolute top-6 left-4 transform -rotate-[45deg]  text-white z-2 font-semibold">
            230 $
          </span>
          <Image
            src={UpComming1}
            alt="UpComming1"
            className=" w-50 h-50  object-contain z-[3]"
          />
        </Link>
      </div>
    </div>
  );
};

export default UpComming;
