import React from "react";
import { Hero1Navbar } from ".";
import Image from "next/image";
import hero1 from "../../src/assets/images/landingPage/hero1.png";
import Link from "next/link";

const Hero1 = () => {
  return (
    <main className="overflow-x-hidden h-fit md:h-screen bg-gradient-to-br from-[#FEFEFE] from-20% to-[#407BFF] to-100% lg:px-20 px-5 nbt:px-1 nbt:pb-4 py-10">
      <Hero1Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2  ">
        <div className=" h-[32rem] p-5 flex col-span-2 md:col-span-1 flex-col justify-evenly">
          <div className="  bg-gradient-to-r from-[#B5CCFF] from-10% to-[#004FFF] to-100% lg:w-[45%] w-[88%] text-white font-mono tracking-widest flex px-2 gap-x-3 items-center whitespace-nowrap">
            <div className="w-4 h-4 bg-[#D9D9D9] "></div>
            LEADS MANAGEMENT
          </div>
          <div>
            <h2 className="text-gray-700 lg:text-5xl sm:text-4xl text-3xl font-semibold">
              Welcome to your
            </h2>
            <h2 className="text-[#407BFF] font-semibold  sm:text-4xl text-3xl lg:text-5xl  ">
              OmniLeadz
            </h2>
          </div>
          <p className="w-[85%]">
            {" "}
            Unlocking Growth Through Actionable Insights: Your Premier Destination
            for Managing and Maximizing Data-Driven Leads!
          </p>
          <Link
            href={"/login"}
            className=" bg-blue-500 px-5  lg:text-xl text-sm rounded-sm text-white h-14 w-fit items-center whitespace-nowrap flex self-center xs:self-start"
          >
            <button>Try it Now {"-> "}</button>
          </Link>
        </div>
        <div className=" md:h-[32rem] w-full md:flex md:items-center md:justify-end justify-center items-start ">
          <Image
            src={hero1}
            alt={"hero main"}
            priority
            className="h-[90%] object-contain "
          />
        </div>
      </div>
    </main>
  );
};

export default Hero1;


