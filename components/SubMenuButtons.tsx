"use client";
import React from "react";
interface ISubMenuButtonProps {
  data: ISubMenuButtons[];
  onSelect: (value: string) => void;
  activeFilter: string;
}
interface ISubMenuButtons {
  id: number;
  title: string;
  value: string;
}

const SubMenuButtons: React.FC<ISubMenuButtonProps> = ({
  data,
  onSelect,
  activeFilter,
}) => {
  return (
    <main className="h-16 w-full flex items-center border-b-2 text-gray-500 tracking-wider text-[0.6rem] md:text-xs  lg:gap-x-5 gap-x-2 ">
      {data &&
        data.map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelect(item.value)}
              className={` transition-all duration-300 sm:px-4 px-2 py-2 rounded cursor-pointer  
               capitalize hover:bg-[#0017F7] hover:text-white hover:border-[#0017F7] ${
                 item.value === activeFilter
                   ? "bg-[#0017F7] text-white border-[1.5px] border-[#0017F7]"
                   : "border-[1.5px] border-gray-400 "
               }`}
            >
              {item.title}
            </div>
          );
        })}
    </main>
  );
};

export default SubMenuButtons;
