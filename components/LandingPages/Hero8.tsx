"use client";
import React from "react";
import leaf from "../../src/assets/images/landingPage/leaf-right.png";
import Image from "next/image";
const Hero8 = () => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log("name entered");
  };

  const list = ["Business Type", "Producer", "Retailer", "Wholesaler"];

  return (
    <main className="h-[70vh] w-full flex  items-center justify-center bg-[#F9FAFB] flex-col relative">
      <div className="absolute lg:block hidden right-0 top-20  ">
        <Image src={leaf} alt={""} priority />
      </div>
      <h2 className="lg:text-6xl sm: text-4xl lg:w-[50%] sm:w-[70%] w-[90%] text-[#407BFF] font-semibold">
        Ready to Start a Business Using a Omnileadz?
      </h2>
      <div className="mt-10 lg:w-[50%] sm:w-[70%] w-[90%] flex items-center justify-center p-4 bg-white border-[0.5px] border-gray-300 rounded flex-col lg:flex-row gap-y-5">
        <input
          type="text"
          name="name"
          value=""
          className="w-full p-1 px-2 h-12 outline-none text-gray-600"
          onChange={handleChange}
          placeholder="Enter Name..."
        />
        <select
          name="businessType"
          value="Business Type"
          onChange={handleChange}
          className=" p-1 px-2 h-12 w-full capitalize outline-none text-gray-600 border-l-2"
        >
          {list.map((itemValue: string) => {
            return (
              <option key={itemValue} value={itemValue} className="capitalize">
                {itemValue}
              </option>
            );
          })}
        </select>
        <button
          className=" border bg-blue-500 w-full lg:w-fit px-5 text-base rounded text-white h-12 lg:ml-4 ml-0   whitespace-nowrap flex items-center justify-center
            hover:bg-white hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
        >
          Learn More {"-> "}
        </button>
      </div>
    </main>
  );
};

export default Hero8;
