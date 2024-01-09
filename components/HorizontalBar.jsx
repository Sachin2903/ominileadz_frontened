import React from "react";
import bar from "@/src/assets/horizontal-bar.png";
import Image from "next/image";
import {horizontalBar} from "@/src/assets/cloudinaryImageLinks"

const HorizontalBar = () => {
  return (
    <div className="absolute top-7 -right-2 ">
      <img src={horizontalBar} alt="bar" />
    </div>
  );
};

export default HorizontalBar;
