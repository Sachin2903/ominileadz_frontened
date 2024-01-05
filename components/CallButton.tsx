import React from "react";
import { FiUploadCloud } from "react-icons/fi";

interface ICallButton {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const CallButton = ({ icon, text, onClick }: ICallButton) => {
  return (
    <button
      className="transition-all duration-300 sm:px-4 px-2 py-2 rounded-md cursor-pointer  capitalize bg-[#0017F7] text-white flex items-center gap-x-2 md:text-xs  text-[0.6rem]"
      onClick={onClick}
    >
      {icon || <FiUploadCloud />}
      {text}
    </button>
  );
};

export default CallButton;
