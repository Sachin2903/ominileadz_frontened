import React from "react";

interface ILeadCardFormSelect {
  name: string;
  value: string;
  handleOptionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  list: string[];
}

const LeadCardFormSelect: React.FC<ILeadCardFormSelect> = ({
  name,
  value,
  handleOptionChange,
  list,
}) => {
  return (
    <div className="">
      <select
        name={name}
        value={value}
        id={name}
        onChange={handleOptionChange}
        className="outline-none py-0.5 tracking-wide text-sm border-2 rounded-md  text-gray-700"
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default LeadCardFormSelect;
