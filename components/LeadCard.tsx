"use client";
import React from "react";
import { FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { FormRowSelect, LeadCardFormSelect } from ".";

const LeadCard = () => {
  const handleOptionChange = () => {
    // console.log("handle option change");
  };

  return (
    <div className="h-40 xl:w-96 lg:w-72 w-80 border-2 flex flex-col justify-evenly px-4 rounded-sm">
      <div className="flex items-center">
        <div className="rounded-full bg-blue-600 text-white px-1.5 py-1 capitalize mr-2">
          TU
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-600">Test User</h2>
          <h2 className="text-sm text-gray-500 mt-0.5 tracking-wide">
            Today at 4:30 PM
          </h2>
        </div>
      </div>
      <div className=" xl:flex xl:justify-between text-sm tracking-wider">
        <div>
          <h2 className="text-gray-700 flex items-center ">
            <FiMail className="scale-125" />
            <span className="ml-3 tracking-wider">testuser@xyz.com</span>
          </h2>
          <h2 className="text-gray-500 flex items-center mt-1">
            <BsTelephone className="scale-125 " />
            <span className="ml-3 text-xs mt-1">(405 555-0128)</span>
          </h2>
        </div>
        <div className="mt-1 xl:mt-0">
          <LeadCardFormSelect
            name="stage"
            value=""
            handleOptionChange={handleOptionChange}
            list={["Regretted", "Requirements", "Quotation"]}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
