import React from "react";
import { BtnProps } from "./types";

const ButtonComp: React.FC<BtnProps> = ({
  label,
  icon: Icon,
  disabled,
  onClick,
  outLine,
  small,
  custom,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        outLine ? "bg-white text-[#211436]" : "bg-[#8f59e6] text-white"
      } w-full flex items-center justify-center gap-2 border border-[#8f59e6] disabled:opacity-70 disabled:cursor-not-allowed rounded-md transition-opacity duration-75 ease-linear hover:bg-opacity-80 ${
        small
          ? "text-sm py-2 px-2 font-light bottom-[1px]"
          : "text-md py-3 px-4 font-semibold bottom-2"
      } ${custom ? custom : ""} `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default ButtonComp;
