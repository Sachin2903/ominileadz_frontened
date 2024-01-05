"use client";

import asideIcons from "@/src/data/asideIcons";
import Link from "next/link";
import React from "react";
import Img from "../src/assets/amico.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setLeadCategoryTextValue,
  setLeadSubCategoryTextValue,
} from "@/redux/features/filterLeads/filterLeadsSlice";

type ChildIconType = {
  id: number;
  title: string;
  value: string;
};

type AsideIconType = {
  id: number;
  icon: JSX.Element;
  path: string;
  title: string;
  mainCategory: string;
  children?: ChildIconType[];
};

const Aside: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { leadCategory, leadSubCategory } = useAppSelector(
    (state: { filterLeadsSlice: any }) => state.filterLeadsSlice
  );
  const dispatch = useAppDispatch();
  const isPathActive = (path: string, children?: ChildIconType[]): boolean => {
    if (pathname === path) {
      return true;
    }
    if (children && pathname === path) {
      return children.some((child) => leadCategory === child.value);
    }
    return false;
  };
  const handleMainCategoryClick = (icon: AsideIconType) => {
    dispatch(setLeadCategoryTextValue(icon.mainCategory));
  };

  const handleChildClick = (child: ChildIconType) => {
    dispatch(setLeadCategoryTextValue(child.value));
    if (child.title.toLowerCase() === "follow up") {
      dispatch(setLeadSubCategoryTextValue("all_leads"));
    }
    // if (pathname === "/leads") {
    //   dispatch(setLeadCategoryTextValue("new_leads"));
    // }

    if (pathname !== "/leads") {
      router.push("/leads");
      dispatch(setLeadCategoryTextValue("new_leads"));
    }
  };

  return (
    <main className="h-screen w-[17.5rem] bg-[#F6F8F9] xs:flex hidden flex-col items-center justify-evenly py-10">
      <div className="flex flex-col gap-y-10 w-[70%] h-full overflow-y-auto hide-scrollbar py-7">
        {asideIcons.map((icon) => (
          <div key={icon.id}>
            <div
              onClick={() => handleMainCategoryClick(icon)}
              className="cursor-pointer font-semibold text-gray-700 "
            >
              <Link
                href={icon.path}
                className={`flex gap-x-6 hover:text-[#369FFF] cursor-pointer ${
                  isPathActive(icon.path, icon.children)
                    ? "text-[#369FFF]"
                    : "text-gray-700 "
                }`}
              >
                <h2 className="text-xl">{icon.icon}</h2>
                <h2 className="text-sm">{icon.title}</h2>
              </Link>
        </div>

            {icon.children && (
              <div className="flex flex-col overflow-y-auto">
                {icon.children.map((childIcon) => {
                  return (
                    <div
                      key={childIcon.id}
                      onClick={() => handleChildClick(childIcon)}
                      className={`flex text-gray-500  gap-x-4 hover:text-[#369FFF] cursor-pointer mt-5 ml-5 items-center ${
                        leadCategory === childIcon.value &&
                        pathname === icon.path
                          ? "text-[#369FFF]"
                          : "text-gray-500"
                      }`}
                    >
                      <h2 className="text-xl"> -</h2>
                      <h2 className="text-sm">{childIcon.title}</h2>
                    </div>
                  );
                })}
              </div>
            )}



          </div>
        ))}
      </div>
      <div className="w-[85%] mt-10">
        <Image src={Img} alt="aside img" priority />
      </div>
    </main>
  );
};
export default Aside;
