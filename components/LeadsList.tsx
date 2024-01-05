import React from "react";

interface IDataProps {
  list: IData;
}

interface IData {
  id: string;
  leadDate: string;
  title: string;
  source: string;
  customer: string;
  company: string;
  tags: string[];
  phase?: string;
  stage: string;
  createdAt?: string;
}

const LeadsList: React.FC<IDataProps> = ({ list }) => {
  return (
    <div className="grid border-2 border-gray-500 md:grid-cols-6  py-3 capitalize px-2 text-sm rounded cursor-pointer">
      <p className="">{list.id}</p>
      <p className="">{list.title}</p>
      <p className="">{list.source}</p>
      <p className="">{list.company}</p>
      <p className="">{list.phase}</p>
      <p className="">{list.stage}</p>
    </div>
  );
};

export default LeadsList;
