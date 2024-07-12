"use client";
import { useCallback, useState } from "react";
import Avatar from "../sharedComponent/Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import MenueItem from "./MenueItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { CurrentUserProps } from "@/types";

const UserMenue: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className="relative z-30">
        <div
          onClick={() => toggleOpen()}
          className="p-[2px] border border-slate-300 flex flex-row items-center  relative
         rounded-full cursor-pointer text-slate-400 transition-all  duration-75 ease-linear hover:shadow-md"
        >
          <Avatar /> 
        </div>
        {isOpen && (
          <div
            className="absolute rounded-md shadow-md
       w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer"
          >
            {currentUser ? (
              <div>
                <Link href="/orders">
                  <MenueItem onClick={toggleOpen}>Your orders</MenueItem>
                </Link>
                <Link href="/admin">
                  <MenueItem onClick={toggleOpen}>Admin dashboard</MenueItem>
                </Link>
                <hr />
                <MenueItem
                  onClick={() => {
                    toggleOpen();
                    signOut({callbackUrl:'/auth/login'});
                  }}
                >
                  Log out
                </MenueItem>
              </div>
            ) : (
              <div>
                <Link href="/auth/login">
                  <MenueItem onClick={toggleOpen}>Login</MenueItem>
                </Link>
                <Link href="/auth/register">
                  <MenueItem onClick={toggleOpen}>Register</MenueItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen && <BackDrop onClick={() => toggleOpen()} />}
    </>
  );
};

export default UserMenue;
