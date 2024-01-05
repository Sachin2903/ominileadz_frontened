"use client";

import asideIcons from "@/src/data/asideIcons";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";

const SmallAside = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);
  return (
    <main className="fixed bottom-0 z-50 bg-[#F6F8F9] flex items-center w-screen h-20 xs:hidden">
      <div className="flex w-full items-center justify-evenly">
        {asideIcons.map((icon, index) => {
          return (
            <Link
              href={icon.path}
              key={index}
              className={`flex flex-col items-center gap-y-2  hover:text-[#369FFF] cursor-pointer ${
                icon.path === path ? "text-[#369FFF]" : "text-[#BDBDBD]"
              }`}
            >
              <h2 className="text-2xl">{icon.icon}</h2>
              <h2 className="text-xs">{icon.title}</h2>
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default SmallAside;
