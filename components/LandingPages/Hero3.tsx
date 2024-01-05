import Image from "next/image";
import React from "react";

import img1 from "../../src/assets/images/landingPage/h3-img1.png";
import img2 from "../../src/assets/images/landingPage/h3-img2.png";
import img3 from "../../src/assets/images/landingPage/h3-img3.png";
import img4 from "../../src/assets/images/landingPage/h3-img4.png";
import img5 from "../../src/assets/images/landingPage/h3-img5.png";
import img6 from "../../src/assets/images/landingPage/h3-img6.png";
import img7 from "../../src/assets/images/landingPage/h3-img7.png";

import line from "../../src/assets/images/landingPage/connectingLine.png";
import Link from "next/link";

const data = [
  {
    title: "Never Miss a Lead",
    text: " Salespeople call smoothly through each day and get more done in less time.",
    img: img1,
  },
  {
    title: "Higher Sales productivity from all your teams",
    text: "Maximize sales efficiency with budget-friendly leads management software.",
    img: img2,
  },
  {
    title: "Teamwork made easier",
    text: "Simplify collaboration and boost productivity with our software, designed to make teamwork easier and more efficient for your entire team.",
    img: img3,
  },
  {
    title: "Reduce turnaround times",
    text: "Empower your salespeople to connect with prospects faster.",
    img: img4,
  },
  {
    title: "Maximize sales by prioritising qualified leads",
    text: "Salespeople can work smarter, spending more time with the right prospects.",
    img: img5,
  },
  {
    title: "Optimize Sales",
    text: "Sales and marketing managers can optimize processes without touching a single line of code.",
    img: img6,
  },
  {
    title: "Best support which you desire for",
    text: "Salespeople can work smarter, spending more time with the right prospects.",
    img: img7,
  },
];

const Hero3 = () => {
  return (
    <main className="h-auto md:px-32 sm:px-20 px-10 mt-10 flex flex-col pb-10 md:gap-y-28 gap-y-10 relative">
      {data.map((item, index) => {
        return index % 2 !== 0 ? (
          <div key={index} className="grid grid-cols-2 gap-x-20 z-20">
            <div className="h-[18rem] w-full items-end md:flex hidden">
              <Image
                src={item.img}
                alt={"img"}
                priority
                className="bg-white object-contain h-full "
              />
            </div>
            <div className="flex flex-col col-span-2 md:col-span-1 md:gap-y-6 gap-y-3 justify-center">
              <h2 className="text-[#407BFF] md:text-3xl text-xl">
                {item.title}
              </h2>
              <p className="md:text-xl text-sm">{item.text}</p>
            </div>
          </div>
        ) : (
          <div key={index} className="grid grid-cols-2 gap-x-20 z-20">
            <div className="flex flex-col col-span-2 md:col-span-1 md:gap-y-6 gap-y-3 justify-center ">
              <h2 className="text-[#407BFF] md:text-3xl text-xl">
                {item.title}
              </h2>
              <p className="md:text-xl text-sm">{item.text}</p>
            </div>
            <div className="h-[18rem] w-full items-end justify-end md:flex hidden ">
              <Image
                src={item.img}
                alt={"img"}
                priority
                className="bg-white object-contain h-full "
              />
            </div>
          </div>
        );
      })}
      <div className="w-full flex items-center justify-center">
        <Link
          href={"/login"}
          className=" bg-blue-500 px-5  lg:text-xl text-sm rounded-sm text-white h-14 w-fit whitespace-nowrap flex"
        >
          <button>Try it Now {"-> "}</button>
        </Link>
      </div>
      <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full hidden md:block absolute">
        <Image src={line} alt={""} priority className="mt-24 h-[70%] " />
      </div>
    </main>
  );
};

export default Hero3;
