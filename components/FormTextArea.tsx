import React from "react";

interface IFormTextArea {
  name: string;
  value: string;
  handleTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  labelText?: string;
  rows?: number;
  cols?: number;
}

const FormTextArea: React.FC<IFormTextArea> = ({
  name,
  value,
  handleTextArea,
  labelText,
  rows = 4,
  cols = 40,
}) => {
  return (
    <div className="flex flex-col w-full sm:text-sm text-xs">
      <label htmlFor={name} className="text-gray-500 capitalize ">
        {labelText || name}
      </label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        className="border-2 rounded border-gray-200 mt-1 p-1 outline-none"
        onChange={handleTextArea}
      />
    </div>
  );
};

export default FormTextArea;
