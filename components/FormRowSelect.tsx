"use client";
import React from "react";

interface IFormRowSelect {
  labelText?: string;
  name: string;
  value: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}

const FormRowSelect: React.FC<IFormRowSelect> = ({
  labelText,
  name,
  value,
  handleOptionChange,
  list,
}) => {
  return (
    <div className=" flex flex-col w-full  sm:text-sm text-xs ">
      <label htmlFor="name" className="text-gray-700 capitalize tracking-wide">
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        id={name}
        onChange={handleOptionChange}
        className="border-[0.5px] rounded border-gray-300 mt-1 p-[0.3rem] capitalize outline-none text-gray-600"
      >
        {list.map((itemValue) => {
          return (
            <option key={itemValue} value={itemValue} className="capitalize">
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
