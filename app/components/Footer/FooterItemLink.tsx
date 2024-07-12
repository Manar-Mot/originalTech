import React from "react";
import Link from "next/link";
import { FooterItemLinkProps } from "./types";

const FooterItemLink: React.FC<FooterItemLinkProps> = ({ name, link }) => {
  return (
    <li className="m-4  transition-all ease-linear duration-300   hover:text-accent-10 text-slate-400">
      <Link href={link} target="_self">{name}</Link>
    </li>
  );
};

export default FooterItemLink;
