import React from "react";
import { GrClose } from "react-icons/gr";

interface CloseGrButton {
  onClick: () => void;
  className?: string;
}

const CloseGrButton = ({ onClick, className }: CloseGrButton) => {
  return (
    <div
      className={`absolute  top-5 text-xl cursor-pointer ${className}`}
      onClick={onClick}
    >
      <GrClose />
    </div>
  );
};

export default CloseGrButton;
