import React from "react";
import bar from "@/src/assets/horizontal-bar.png";
import Image from "next/image";

const HorizontalBar = () => {
  return (
    <div className="absolute top-7 -right-2 ">
      <Image src={bar} alt="bar" />
    </div>
  );
};

export default HorizontalBar;
