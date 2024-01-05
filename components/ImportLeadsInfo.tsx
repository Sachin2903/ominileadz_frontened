import React from "react";

interface ILeadsImportProps {
  data: ILeadsImportsHistory;
}

interface ILeadsImportsHistory {
  id: string;
  importedOn: string;
  fileName: string;
  totalRecords: string;
  erro: string;
  company: string;
  tags: string[];
  phase: string;
  stage: string;
  createdAt: string;
}

const ImportLeadsInfo: React.FC<ILeadsImportProps> = ({ data }) => {
  const initials = data.company
    .split(" ")
    .map((e) => e.charAt(0))
    .join("");
  return (
    <div className="sm:flex justify-around items-center border-2 py-1 my-1 text-sm md:text-md px-5 md:px-0 ">
      <div className="flex items-center mt-1">
        <h2 className="rounded-full bg-blue-600 text-white px-1.5 py-1 capitalize mr-2">
          {initials}
        </h2>
        <h2>{data.company}</h2>
      </div>
      <div className="flex lg:w-1/2 sm:w-2/3 sm:flex-row justify-between mt-2 ">
        <div className="sm:flex gap-x-5">
          <p>{data.importedOn}</p>
          <p>{data.createdAt}</p>
          <p className="capitalize">{data.stage}</p>
        </div>
        <div className="">
          <button className="capitalize text-blue-500 whitespace-nowrap">
            {data.fileName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportLeadsInfo;
