import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="w-full bg-[#211436]  py-2 px-4 flex justify-between items-center">
      <div className="right-section">{/* <ToggleMode /> */}</div>
      <div className="left-section space-x-4 text-xs md:text-sm ">
        {/* <Link
          href="/auth/login"
          className="text-white hover:text-gray-300 transition duration-300  "
        >
          sign In
          <span className="mx-2">/</span>
        </Link> */}
        {/* <Link
          href="/auth/register"
          className="text-white hover:text-gray-300 transition duration-300"
        >
          sign up
        </Link> */}
      </div>
    </div>
  );
};

export default TopBar;
