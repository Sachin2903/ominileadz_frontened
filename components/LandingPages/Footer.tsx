import React from "react";
import { Logo } from "..";
import leaf from "../../src/assets/images/landingPage/leaf-left.png";
import Image from "next/image";

const navList = [
  {
    id: 0,
    text: "Products",
  },
  {
    id: 1,
    text: "Solution",
  },
  {
    id: 2,
    text: "Industries",
  },
  {
    id: 3,
    text: "Pricing",
  },
  {
    id: 4,
    text: "Resources",
  },
];
const aboutList = [
  {
    id: 0,
    text: "FAQ",
  },
  {
    id: 1,
    text: "Contact",
  },
  {
    id: 2,
    text: "Feature",
  },
  {
    id: 3,
    text: "Client",
  },
];
const contactList = [
  {
    id: 0,
    text: "9090909090",
  },
  {
    id: 1,
    text: "omnileads@gmail.com",
  },
];

const Footer = () => {
  return (
    <main className="h-auto lg:h-[60xh] relative ">
      <div className="absolute lg:block hidden top-36   ">
        <Image src={leaf} alt={""} priority />
      </div>
      <div className="grid grid-cols-6 md:p-20 p-10 gap-y-10 ">
        <div className="md:col-span-3 col-span-6">
          <Logo className="text-[#407BFF] lg:text-3xl text-xl " />
          <h2>Ludhiana, Amritsar, Delhi, Haryana, India</h2>
        </div>
        <div className="col-span-3 sm:col-span-2 md:col-span-1  ">
          <h2 className="font-semibold">NAVIGATION</h2>
          <div className="flex flex-col gap-y-5 mt-5">
            {navList.map((item, index) => {
              return (
                <h2
                  key={index}
                  className="text-gray-500 hover:text-blue-500 transition-all duration-200 cursor-pointer text-xs xs:text-base"
                >
                  {item.text}
                </h2>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 sm:col-span-2 md:col-span-1  ">
          <h2 className="font-semibold">ABOUT US</h2>
          <div className="flex flex-col gap-y-5 mt-5">
            {aboutList.map((item, index) => {
              return (
                <h2
                  key={index}
                  className="text-gray-500 hover:text-blue-500 transition-all duration-200 cursor-pointer text-xs xs:text-base"
                >
                  {item.text}
                </h2>
              );
            })}
          </div>
        </div>
        <div className="col-span-3 sm:col-span-2 md:col-span-1  ">
          <h2 className="font-semibold">CONTACT</h2>
          <div className="flex flex-col gap-y-5 mt-5">
            {contactList.map((item, index) => {
              return (
                <h2
                  key={index}
                  className="text-gray-500 hover:text-blue-500 transition-all duration-200 cursor-pointer text-xs xs:text-base"
                >
                  {item.text}
                </h2>
              );
            })}
          </div>
        </div>
      </div>
      <h2 className="text-center py-5">
        © Copyright {new Date().getFullYear()} OmniLeads
      </h2>
    </main>
  );
};

export default Footer;
