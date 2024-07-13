"use client"
import React from "react";
import {
  FaSearchLocation,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import FooterItemLink from "./FooterItemLink";
import FooterItemInfo from "./FooterItemInfo";
import Image from "next/image";
import {  AppLogoWhite } from "../../../public/assets";
import Link from "next/link";
import { HiMapPin, HiOutlineMapPin } from "react-icons/hi2";

import Container from "../sharedComponent/Container";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const path = usePathname();
  const isAdminPage = path?.startsWith("/admin");

  if (isAdminPage) {
    return null; 
  }

  return (
    <footer className=" text-white px-10 py-20 w-full h-auto bg-secondary-30">
      <Container>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8">
          <div className="md:col-span-3 xl:col-span-2">
            <Link href="#" className="flex items-center">
              <Image src={AppLogoWhite} alt="logo" className="h-10 w-auto mx-2" />
             
            </Link>
            <p className="py-4 leading-loose tracking-wide text-slate-400">
              Your ultimate destination to discover and buy the best tools and
              accessories for laptops. We offer high-performance laptops and
              premium accessories to enhance your tech experience. Explore our
              collection and enjoy better performance for your laptop.
            </p>
          </div>
          <div>
            <h2 className="font-bold border border-accent-10 p-2 rounded-xl text-center">
              Available Categories
            </h2>
            <ul>
              <FooterItemLink name="Laptops" link="/" />
              <FooterItemLink name="Mobiles" link="/" />
              <FooterItemLink name="Keyboards" link="/" />
              <FooterItemLink name="Desktop Computers" link="/" />
              <FooterItemLink name="Other Accessories" link="/" />
              <FooterItemLink name="Mice" link="/" />
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg border border-accent-10 text-center p-2 rounded-xl">
              Quick Links
            </h2>
            <ul>
              <FooterItemLink name="store" link="/" />
              <FooterItemLink name="Blog" link="/" />
              <FooterItemLink name="About" link="/" />
              <FooterItemLink name="Contact Us" link="/" />
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg border border-accent-10 text-center p-2 rounded-xl">
              Connect with Us
            </h2>
            <ul className="px-3">
              <FooterItemInfo
                Icon={<HiMapPin className="text-sm" />}
                content="Idleb,Idleb,Syria"
                link="https://www.google.com/maps?q=Idleb,Idleb,Syria"
              />
              <FooterItemInfo
                Icon={<FaPhone className="text-sm" />}
                content="+963938352445"
                link="tel:+963938352445"
              />
              <FooterItemInfo
                Icon={<FaEnvelope className="text-sm" />}
                content="manar.bakier@gmail.com"
                link="mailto:manar.bakier@gmail.com"
              />
              <FooterItemInfo
                Icon={<FaLinkedin className="text-sm" />}
                content="manar-baker"
                link="https://www.linkedin.com/in/manar-baker"
              />
            </ul>
          </div>
        </div>
        <a href="#">
          <div className="text-sm flex justify-center items-center transition-all ease-linear duration-300 hover:text-accent-10 text-slate-300 absolute bottom-0 left-0 w-full h-10 border-t my-auto border-gray-400 border-opacity-50">
            <span className="mx-1">©</span>
            <span className="text-sm">
              2024 - Manar Baker - All Rights Reserved
            </span>
          </div>
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
