import React from "react";
import { FooterItemInfoProps } from "./types";
import Link from "next/link";
const FooterItemInfo: React.FC<FooterItemInfoProps> = ({
  Icon,
  content,
  link,

}) => {
  return (
    <Link href={link} target="_blank">
      <li className="flex my-5">
        <span className="mr-2 p-1 rounded-lg border border-accent-10">{Icon}</span>
        <span className="text-slate-400 transition-all ease-linear duration-300   hover:text-accent-10">{content}</span>
      </li>
    </Link>
  );
};

export default FooterItemInfo;
