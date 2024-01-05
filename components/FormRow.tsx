"use client";
import React from "react";
interface IFormRow {
  type: string;
  name: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
}

const FormRow: React.FC<IFormRow> = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}) => {
  return (
    <div className=" flex flex-col w-full  sm:text-sm text-xs">
      <label htmlFor="name" className="text-gray-700 capitalize tracking-wide">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className="border-[0.5px] rounded border-gray-300 mt-1 p-1 outline-none text-gray-600"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
