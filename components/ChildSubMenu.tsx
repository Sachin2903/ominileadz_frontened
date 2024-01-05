import React from "react";
import Link from "next/link";

interface IChildSubMenuProps {
  data: IChildSubMenu[];
}

interface IChildSubMenu {
  id: number;
  title: string;
  path: string;
}

const ChildSubMenu: React.FC<IChildSubMenuProps> = ({ data }) => {
  return (
    <main className="h-12 flex items-center  text-gray-500 tracking-wider text-sm pl-5 my-3">
      {data &&
        data.map((item, index) => {
          const { title, path } = item;
          return (
            <Link href={path} key={index}>
              <h2 className="bg-blue-100 ml-5  hover:text-blue-500 hover:bg-white transition-all duration-300 px-3 py-1 rounded-md cursor-pointer capitalize">
                {title}
              </h2>
            </Link>
          );
        })}
    </main>
  );
};

export default ChildSubMenu;
