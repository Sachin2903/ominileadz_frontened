"use client";

import asideIcons from "@/src/data/asideIcons";
import Link from "next/link";
import React, { useState } from "react";
import Img from "../src/assets/amico.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setLeadCategoryTextValue,
  setLeadSubCategoryTextValue,
} from "@/redux/features/filterLeads/filterLeadsSlice";
import { IoMdLock } from "react-icons/io";
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
    if (pathname === path) return true;
    if (children && pathname === path) {
      return children.some((child) => leadCategory === child.value);
    }
    return false;
  };
  const [route, setRoute] = useState("");
  const handleMainCategoryClick = (icon: AsideIconType) => {
    console.log(icon);
    setRoute(icon.path);
    dispatch(setLeadCategoryTextValue(icon.mainCategory));
  };

  const handleChildClick = (child: ChildIconType, icon: AsideIconType) => {
    
    if (icon.path === "/leads") {
      // console.log(icon.path)
      router.push("/leads");
      dispatch(setLeadCategoryTextValue(child.value));
      // return;
    } else
    if (child.title.toLowerCase() === "follow up") {
      dispatch(setLeadSubCategoryTextValue("all_leads"));
    }
    // if (pathname === "/leads") {
    //   dispatch(setLeadCategoryTextValue("new_leads"));
    // }
    // else if (child.value.toLowerCase() === "edit") {
    //   router.push("/createblogs/edit");
    // } else if (child.value.toLowerCase() === "myblogs") {
    //   router.push("/createblogs/myblogs");
    // }
    else if (
      pathname.startsWith("/leads") &&
      (pathname.startsWith("/store") && pathname.startsWith("/website") && pathname === ("/createblogs"))
    ) {
      router.push("/leads");
      dispatch(setLeadCategoryTextValue("new_leads"));
    } else if (icon.path!=="/leads") {
      router.push(icon.path + "/" + child.value.toLowerCase());
    }
  };
  // console.log(leadCategory,"from lead page")
  return (
    <main className="h-screen w-[17.5rem] bg-[#F6F8F9] xs:flex hidden flex-col items-center justify-evenly py-10">
      <div className="flex flex-col gap-y-10 w-[70%] h-full overflow-y-auto hide-scrollbar py-7">
        {asideIcons.map((icon) => (
          <div key={icon.id}>
            <div className="">
              {icon.path !== "/leads" && icon.path !== "/store" && icon.path !=="/website" && icon.path !=="/createblogs" ? (
                <Link
                  href={icon.status?icon.path:""}
                  className={`flex  gap-x-6 hover:text-[#369FFF] cursor-pointer 
                 ${
                   isPathActive(icon.path, icon.children)
                     ? "text-[#369FFF]"
                     : ""
                 }
                 ${
                   pathname.startsWith(icon.path)
                     ? "text-[#369FFF]"
                     : "text-gray-600"
                 }
                `}
                >
                
                  <h2 className="text-xl">{icon.icon}</h2>
                  <h2 className="text-sm">{icon.title}</h2>
                  {!icon.status?<IoMdLock className="hover:text-red-500 w-5"/>:null}
                  
                </Link>
              ) : (
                <>
                  <div
                    onClick={() => handleMainCategoryClick(icon)}
                    className={`flex  gap-x-6 hover:text-[#369FFF]  cursor-pointer
                 ${
                   isPathActive(icon.path, icon.children)
                     ? "text-[#369FFF]"
                     : ""
                 }
                 .
                 ${
                   pathname.startsWith(icon.path)
                     ? "text-[#369FFF]"
                     : "text-gray-600"
                 }
                `}
                  >
                    <h2 className="cursor-pointer text-xl">{icon.icon}</h2>
                    <h2 className="cursor-pointer text-sm">{icon.title}</h2>
                    {!icon.status?<IoMdLock className="hover:text-red-500 w-5"/>:null}
                  </div>
                </>
              )}
            </div>

            {icon.status&&icon.children && (
              <div className="flex flex-col overflow-y-auto">
                {icon.children.map((childIcon) => {
                  const isChildActive =
                    isPathActive(icon.path, icon.children) &&
                    leadCategory === childIcon.value;

                  return (
                    <div
                      key={childIcon.id}
                      onClick={() => handleChildClick(childIcon, icon)}
                      className={`flex  gap-x-4 hover:text-[#369FFF] cursor-pointer mt-5 ml-5 items-center ${
                        pathname !== "/leads"
                          ? pathname.startsWith(
                              icon.path + "/" + childIcon.value
                            )
                            ? "text-[#369FFF]"
                            : "text-gray-600"
                          : isChildActive
                          ? "text-[#369FFF]"
                          : ""
                      }`}
                    >
                      <h2 className="text-xl"> -</h2>
                      <h2 className="text-xs">{childIcon.title}</h2>
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
