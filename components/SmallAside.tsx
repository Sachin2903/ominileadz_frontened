"use client";

import { setLeadCategoryTextValue } from "@/redux/features/filterLeads/filterLeadsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import asideIcons from "@/src/data/asideIcons";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const SmallAside = () => {
  // const [path, setPath] = useState("");

  // leadCategory
  const { leadCategory } = useAppSelector(
    (state: { filterLeadsSlice: any }) => state.filterLeadsSlice
  )

  // update lead category on click
  const dispatch = useAppDispatch();
  const handleMainCategoryClick = (category : string) => {
    dispatch(setLeadCategoryTextValue(category));
  }

  // useEffect(() => {
  //   setPath(window.location.pathname);
  // }, []);
  return (
    <main className="fixed bottom-0 z-50 bg-[#F6F8F9] flex items-center w-screen h-20 xs:hidden">
      <div className="flex w-full items-center justify-evenly">
        {asideIcons.map((icon, index) => {
          return (
            <div 
              // lead category
              onClick={() => handleMainCategoryClick(icon.mainCategory)}
              className="cursor-pointer">
              <Link
                href={icon.path}
                key={index}
                className={`flex flex-col items-center gap-y-2  hover:text-[#369FFF] cursor-pointer ${
                  // icon.path === path ? "text-[#369FFF]" : "text-[#BDBDBD]"
                  icon.mainCategory === leadCategory ? "text-[#369FFF]" : "text-[#BDBDBD]"
                }`}
              >
                <h2 className="text-2xl">{icon.icon}</h2>
                <h2 className="text-xs">{icon.title}</h2>
              </Link>
            </div>
          );
        })}
      </div>
    </main>

  );
};

export default SmallAside;
