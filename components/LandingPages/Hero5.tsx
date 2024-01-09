import Image from "next/image";
import React from "react";
import img from "../../src/assets/images/landingPage/h5-img.png";
import {landingPageH5} from "@/src/assets/cloudinaryImageLinks"

const Hero5 = () => {
  return (
    <main className="h-screen w-full py-20">
      <div className="h-[80vh] bg-[#FAE5DB] grid grid-cols-2 ">
        <div className="col-span-2 md:col-span-1  flex flex-col justify-evenly lg:pl-40 px-10 sm:mt-20 mt-10">
          <h2 className="font-mono tracking-widest text-xl">| ABOUT US |</h2>
          <h1 className="sm:text-5xl text-4xl  font-semibold">
            10+ years of helping you find the Best client
          </h1>
          <p>
            {'"'}With over a decade of experience, we have been dedicated to
            connecting you with the ideal clients. Our expertise and commitment
            to excellence have consistently delivered outstanding results,
            fostering long-term partnerships and helping you thrive in your
            business endeavors. Trust us to find the best clients for you.{'"'}
          </p>
          <button
            className=" border bg-blue-500 w-full sm:w-fit px-5 text-base rounded text-white h-10   whitespace-nowrap flex items-center justify-center
            hover:bg-white hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
          >
            Learn More {"-> "}
          </button>
        </div>
        <div className="cols-span-1 hidden w-full md:flex items-center justify-center">
          <img src={landingPageH5} alt={""}  className=" object-contain " />
        </div>
      </div>
    </main>
  );
};

export default Hero5;
