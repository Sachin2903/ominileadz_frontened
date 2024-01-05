"use client";
import React from "react";
import {useState} from "react";
import { Logo } from "..";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
const Hero1Navbar = () => {
  const [toggle,setToggle]=useState(true)
  return (
    <main className="  h-24 relative py-4 px-1 sm:p-4 w-full bg-white flex items-center justify-between">
      <Logo className="text-[#407BFF] lg:text-4xl  sm:text-3xl text-2xl  " />
      <div className={ `transition-all  duration-700  ease-in-out ${toggle?"-right-[100vw]":"right-0"} bg-white absolute z-30 -bottom-[399px]  w-[100%] h-[400px] flex items-center justify-evenly flex-col text-[18px] nb:static nb:flex-row nb:h-[100%] ` } >
        <h2 className="cursor-pointer text-gray-500 hover:text-black hover:font-medium transition-all duration-2000 ">
          Products
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black hover:font-medium transition-all duration-200 ">
          Solution
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black hover:font-medium transition-all duration-200 ">
          Industries
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black hover:font-medium transition-all duration-200 ">
          Pricing
        </h2>
        <h2 className="cursor-pointer text-gray-500 hover:text-black hover:font-medium transition-all duration-200 ">
          Resource
        </h2>
      </div>
      <Link
        href={"/login"}
        className=" bg-blue-500 px-2  lg:px-5   lg:text-xl text-xs sm:text-sm rounded text-white h-[100%] whitespace-nowrap flex items-center"
      >
        <button>Book a Demo </button>
      </Link>
      <div className="nb:hidden overflow-hidden h-[50%]  w-[65px] relative">
      <HiOutlineMenuAlt3 className={` origin-top-right transition-all top-0 duration-500 linear ${toggle?"rotate-0":"rotate-90"} text-4xl absolute z-50` } onClick={()=>setToggle(false)} />
      <RxCross2 className={`origin-top-right transition-all top-0 duration-500  ease-linear ${toggle?"rotate-90 ":"rotate-0"}  text-4xl absolute z-40`} onClick={()=>setToggle(true)} />
      
        </div>
      
    </main>
  );
};

export default Hero1Navbar;