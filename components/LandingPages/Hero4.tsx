import Image from "next/image";
import React from "react";

import circle from "../../src/assets/images/landingPage/circle1.png";
import {landingPageCircle} from "@/src/assets/cloudinaryImageLinks"
const data = [
  {
    title: "Basic",
    price: "1500",
    heading: "We provide services including the following detail.",
    info: [
      {
        id: 0,
        text: "Full desktop or Browser",
      },
      {
        id: 1,
        text: "Full desktop or Browser",
      },
    ],
  },
  {
    title: "Standard",
    price: "2500",
    heading: "We provide services including the following detail.",
    info: [
      {
        id: 0,
        text: "Full desktop or Browser",
      },
      {
        id: 1,
        text: "Full desktop or Browser",
      },
      {
        id: 2,
        text: "Full desktop or Browser",
      },
    ],
  },
  {
    title: "Premium",
    price: "5500",
    heading: "We provide services including the following detail.",
    info: [
      {
        id: 0,
        text: "Full desktop or Browser",
      },
      {
        id: 1,
        text: "Full desktop or Browser",
      },
      {
        id: 2,
        text: "Full desktop or Browser",
      },
      {
        id: 3,
        text: "Full desktop or Browser",
      },
    ],
  },
];

const Hero4 = () => {
  return (
    <main className="h-auto w-full flex items-center py-10 px-5 flex-col relative">
      <div className="absolute lg:block hidden left-0 bottom-16 ">
        <img src={landingPageCircle} alt={""}  />
      </div>
      <div className="flex justify-center flex-col items-center md:w-[60%] xs:w-[80%] w-full ">
        <h2 className="text-[#407BFF] font-semibold md:text-4xl text-2xl ">
          Choose a plan for your business
        </h2>
        <p className="md:w-[80%]  mt-3 text-sm">
          Every business that we build is special for our clients. We are
          already to provide services from start to finish. The following is
          service you get:
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-x-20 sm:gap-x-10 xs:gap-y-10 gap-y-5  mt-20">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className=" bg-white z-20 xs:h-[30rem] h-auto p-4  border-[0.5px] rounded hover:border-blue-500 cursor-pointer shadow-md hover:shadow-lg"
            >
              <div className="h-auto xs:h-[13rem] flex flex-col gap-y-5 ">
                <h2 className="text-2xl font-semibold text-gray-500 ">
                  {item.title}
                </h2>
                <h3 className="text-gray-400 font-semibold text-3xl ml-2">
                  Rs
                  <span className="text-gray-700 font-semibold  ml-4">
                    {item.price}
                  </span>
                </h3>

                <p className="text-sm text-gray-500">
                  We provide services including the following detail.
                </p>
              </div>
              <div className="h-auto xs:h-[15rem] flex flex-col justify-between border-t-2 mt-10 xs:mt-0">
                <div className="hidden xs:flex flex-col gap-y-2 mt-2 text-sm text-gray-500">
                  {item.info.map((info, index) => {
                    return <h2 key={index}>{info.text}</h2>;
                  })}
                </div>
                <button
                  className=" border border-blue-500 px-5  text-sm rounded-sm text-blue-500 h-10 w-full  whitespace-nowrap flex items-center justify-center
            hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  Get Started {"-> "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Hero4;
