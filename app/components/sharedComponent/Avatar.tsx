import React from "react";
import { AvatarProps } from "./types";
import Image from "next/image";
import { user } from "@/public/assets";
import { FaUserCircle } from "react-icons/fa";
const Avatar: React.FC<AvatarProps> = ({ src,customStyles,height,width }) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          className={`rounded-full h-[32px] border border-slate-200 w-[32px] object-cover ${customStyles}`}
          alt="user avatar "
        />
      ) : (
        <FaUserCircle size={height?height:32} />
      )}
    </>
  );
};

export default Avatar;
