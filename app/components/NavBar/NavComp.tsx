"use client";
import { AppLogo } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMiniBars3, HiMiniXMark } from "react-icons/hi2";
import LinkList from "../NavBar/LinkList";
import UserMenue from "../NavBar/UserMenue";
import { CurrentUserProps } from "@/types";
import SearchComponent from "../NavBar/SearchComp";
import { chakraPetch } from "@/app/Fonts/Fonts";
const NavComp: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };
  const handleOpenSearchModal = () => {
    setSearchOpen(!searchOpen);
  };
  return (
    <nav className={`w-full mx-auto py-[14px] px-2 md:px-8 border border-opacity-20 border-secondary-30 sticky top-0 left-0 z-[999] ${scrolled ? 'bg-secondary-30 text-white' : 'bg-white text-slate-900'}`}>
    <ul className="flex  items-center  justify-between ">
      <SearchComponent isOpen={searchOpen}  handleOpenSearchModal={handleOpenSearchModal}/>
      <div className=" flex justify-center  items-center gap-2">

      <div className="block md:hidden text-2xl   cursor-pointer   ">
        <HiMiniBars3 onClick={() => handleShowMenu()} />
      </div>
      <Link href={`/`} className="text-[24px] gap-1  flex items-center ">
        <Image src={AppLogo} alt="logo" className="w-auto h-[26px] object-cover" />
        <span className={`${chakraPetch.className} font-bold `}>riginalTech</span>
      </Link>
      </div>

      <ul
        className={` md:w-fit w-full p-8  md:p-0 ${
          showMenu ? " top-0 h-fit  " : "-top-[100vh] h-0"
        }  fixed md:static flex flex-col md:flex-row  items-center justify-center text-LinkItem   transition-all duration-300 ease-linear left-0 bg-white  
          md:bg-transparent   
         z-[999]   gap-6 md:gap-4   md:h-fit`}
      >
        <HiMiniXMark
          className="md:hidden text-lg self-end mx-10 cursor-pointer"
          onClick={() => handleShowMenu()}
        />
        <li className="cursor-pointer   group relative">
          <Link
            href="/"
            className={`
     after:transition-all after:ease-linear   after:duration-500  group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 after:w-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-accent-10 `}
          >
            Home
          </Link>
        </li>
        <li className="cursor-pointer   group relative">
          <Link
            href="/store"
            className={`
     after:transition-all after:ease-linear  after:duration-500  group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 after:w-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-accent-10 `}
          >
            Store
          </Link>
        </li>
        <li className="cursor-pointer   group relative">
          <Link
            href="/about"
            className={`
     after:transition-all after:ease-linear  after:duration-500  group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 after:w-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-accent-10 `}
          >
            About
          </Link>
        </li>
        <li className="cursor-pointer   group relative">
          <Link
            href="/contact"
            className={`
     after:transition-all after:ease-linear  after:duration-500  group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 after:w-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-accent-10 `}
          >
            Contact
          </Link>
        </li>
        <li className="cursor-pointer  group relative">
          <Link
            href="/blog"
            className={`
     after:transition-all after:ease-linear  after:duration-500  group-hover:after:content-[''] group-hover:after:absolute group-hover:after:bottom-0 group-hover:after:left-0 after:w-0 group-hover:after:w-full group-hover:after:h-0.5 group-hover:after:bg-accent-10 `}
          >
            Blog
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-2 ">
        <LinkList handleOpenSearchModal={handleOpenSearchModal} scrolled={scrolled} />
        <UserMenue currentUser={currentUser} />
      </div>
    </ul>
    </nav>
  );
};

export default NavComp;
