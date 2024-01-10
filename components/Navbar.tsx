"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BiMessageRounded,
  BiSearch,
  BiSolidBell,
  BiSolidUser,
} from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

interface INavbarProps {
  placeholder?: string;
  inputValue?: string;
  handleInputChange?: (query: string) => void;
}
interface Sidebar {
  isOpen: boolean;
  onClose: () => void;
}

const leadsData = [
  {
    id: 1,
    path: "/leads/newLeads",
    title: "New Leads",
  },
  {
    id: 2,
    path: "/leads/followUp",
    title: "Follow Up",
  },
  {
    id: 3,
    path: "/leads/sendDetails",
    title: "Send Details",
  },
  {
    id: 4,
    path: "/leads/regretted",
    title: "Regretted",
  },
  {
    id: 5,
    path: "/leads/quotation",
    title: "Quotation",
  },
  {
    id: 6,
    path: "/leads/completed",
    title: "Completed",
  },
];

const Sidebar = ({ isOpen, onClose }: Sidebar) => {
  return (
    <main
      className={`fixed top-0 left-0 h-[calc(100vh-8.5rem)] w-[85%] bg-gray-200 transform transition-transform z-[1000] mt-14 xs:hidden duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        className="absolute top-2 right-3  text-3xl cursor-pointer text-red-500"
        onClick={onClose}
      >
        &times;
      </button> 
       <div className="flex w-full items-center justify-center text-gray-500 h-full flex-col space-y-10 text-base">
        {leadsData.map((icon, index) => {
          return (
            <Link
              href={icon.path}
              key={index}
              className={`hover:text-[#369FFF] cursor-pointer`}
              onClick={onClose}
            >
              <h2>{icon.title}</h2>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

const Navbar: React.FC<INavbarProps> = ({
  placeholder,
  inputValue,
  handleInputChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [path, setPath] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSidebarOpen(false);
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  useEffect(() => {
    let pathName = window.location.pathname;
    setPath(pathName.split("/")[1]);
  }, []);

  return (
    <main className="h-14 flex w-full bg-white text-white items-center justify-end px-5 border-b-[1px]">
      <div className="flex items-center justify-between w-full ">
        <div className="relative">
          <div className="absolute top-3 left-3 text-gray-500 hidden md:block ">
            <BiSearch />
          </div>
          <input
            type="search"
            name="search"
            placeholder={placeholder || "search..."}
            className="hidden md:block  rounded-full px-10 py-2 lg:w-[25rem] w-[20rem] outline-none text-gray-500 bg-[#F6F8F9] text-[0.8rem]"
            value={inputValue}
            onChange={(e) => {
              let query = e.target.value;
              if (handleInputChange) handleInputChange(query);
            }}
          />
        </div>
        <div
          className="relative flex items-center space-x-3 text-xl  text-[#B0BABF] cursor-pointer "
          onClick={toggleDropdown}
        >
          {/* <div className="flex items-center space-x-3 align-baseline mr-5 ">
            <BiMessageRounded />
            <h2 className="!text-[1rem] mt-0.5">Feedback ?</h2>
          </div>
          <h2 className="">
            <BiSolidBell />
          </h2>
          <h2 className="">
            <BsFillQuestionCircleFill />
          </h2> */}
          <div className="">
            <BiSolidUser />
          </div>
          {isDropdownOpen && (
            <div className="absolute w-[150px] top-8 right-0 mt-2 bg-white text-gray-700 rounded border shadow-xl z-50">
              <div className="text-sm px-3 py-2 hover:bg-gray-100 cursor-pointer">
                User Details
              </div>
              <hr />
              <div
                className="text-sm px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      {path === "leads" && (
        <div
          className="hover:-rotate-90 transition-all duration-300 text-xl  text-[#B0BABF] cursor-pointer ml-2  xs:hidden "
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu />
        </div>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </main>
  );
};

export default Navbar;
