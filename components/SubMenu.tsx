"use client";
import React from "react";
import { NavLink } from ".";
interface ISubMenuProps {
  data: ISubMenu[];
}
interface ISubMenu {
  id: number;
  title: string;
  path: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({ data }) => {
  return (
    <main className="h-16 w-full flex items-center border-b-2 text-gray-500 tracking-wider text-[0.6rem] md:text-xs  lg:gap-x-5 gap-x-2 ">
      {data &&
        data.map((item, index) => {
          return (
            <NavLink
              href={item.path}
              exact
              key={index}
              className="transition-all duration-300 sm:px-4 px-2 py-2 rounded cursor-pointer  outline -outline-offset-2 outline-1 capitalize hover:bg-[#0017F7] hover:text-white hover:outline-none "
              onActive="bg-[#0017F7] text-white outline-none "
            >
              {item.title}
            </NavLink>
          );
        })}
    </main>
  );
};

export default SubMenu;
