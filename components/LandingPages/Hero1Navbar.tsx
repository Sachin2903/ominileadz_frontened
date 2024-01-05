import React from "react";
import { Logo } from "..";
import Link from "next/link";

const Hero1Navbar = () => {
  return (
    <main className="h-16 w-full bg-white flex items-center justify-between">
      <Logo className="text-[#407BFF] lg:text-3xl text-xl " />
      <div className="md:flex justify-between w-full xl:px-32 lg:px-20 md:px-10 hidden">
        <h2 className="cursor-pointer text-gray-500 hover:text-black transition-all duration-200 ">
          Products
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black transition-all duration-200 ">
          Solution
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black transition-all duration-200 ">
          Industries
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black transition-all duration-200 ">
          Pricing
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black transition-all duration-200 ">
          Resource
        </h2>
      </div>
      <Link
        href={"/login"}
        className=" bg-blue-500 px-5  lg:text-xl text-sm rounded text-white h-full whitespace-nowrap flex items-center"
      >
        <button>Book a Demo </button>
      </Link>
    </main>
  );
};

export default Hero1Navbar;
