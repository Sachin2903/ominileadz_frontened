"use client";
import React, { useState } from "react";

const filters = ["Regretted", "Quotation", "Po received", "Day"];
const LeadsFilter = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <div className=" flex items-center justify-between px-7">
      <div>
        <button className="px-4 py-1 bg-[#0017f7] border-2 border-[#0017f7] text-white  rounded-md text-sm tracking-wide ">
          Follow Up
        </button>
        <button className="px-4 py-1 border-2 border-gray-500 rounded-md text-gray-500 text-sm tracking-wide ml-2 ">
          New Leads
        </button>
      </div>
      <div>
        <select
          value={selectedOption}
          onChange={(e) => handleOptionChange(e.target.value)}
          className="block appearance-none border border-gray-300 py-1 px-4  rounded leading-tight outline-none"
        >
          <option value="" className=" text-gray-400">
            All
          </option>
          {filters.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LeadsFilter;
