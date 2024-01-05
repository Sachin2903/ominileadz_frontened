"use client";

import React from "react";
import { GoCheckCircle } from "react-icons/go";

interface ILeadTaskProps {
  data: ILeadTask[];
}

interface ILeadTask {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  assignedTo: string;
  status: string;
  completedAt: string;
}

const LeadTask: React.FC<ILeadTaskProps> = ({ data }) => {
  return (
    <div className="h-auto w-[20rem] ">
      {data.map((task, index) => (
        <main
          key={index}
          className="flex my-1 h-8 cursor-pointer items-center justify-between"
        >
          <div className="flex items-center  min-w-fit">
            <div className="text-xl text-gray-600">
              <GoCheckCircle />
            </div>
            <h2 className="pl-2 tracking-wide mt-0.5 ">{task.name}</h2>
          </div>
          <div className="text-red-500  text-sm md:text-md min-w-fit">
            {task.dueDate}
          </div>
        </main>
      ))}
    </div>
  );
};
export default LeadTask;
