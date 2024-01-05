import React from "react";

interface ILayout {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<ILayout> = ({ children, className = "" }) => {
  return (
    <div
      className={` xs:max-h-[calc(100vh-8.75rem)] h-[calc(100vh-12.5rem)] mb-20 xs:mb-0 md:px-7 px-2 overflow-y-auto ${className} `}
    >
      {children}
    </div>
  );
};

export default Layout;
