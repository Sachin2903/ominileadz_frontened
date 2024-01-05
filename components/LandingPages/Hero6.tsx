"use client";

import React, { useState } from "react";
import leaf from "../../src/assets/images/landingPage/leaf-left.png";
import { Collapse } from "antd";
import Image from "next/image";

const items = [
  {
    key: "1",
    label:
      "What is leads management software, and how can it benefit my business?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
  {
    key: "2",
    label: "What features are included in your leads management software?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
  {
    key: "3",
    label: "How does the software handle lead data privacy and security?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
  {
    key: "4",
    label: "How does the software handle lead scoring and lead nurturing?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
  {
    key: "5",
    label: "How frequently does the software receive updates and improvements?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
  {
    key: "6",
    label: "How does the software handle lead data privacy and security?",
    children: (
      <p className="font-normal text-[0.8rem]">
        Leads management software is a tool that helps businesses collect,
        organize, and nurture leads. It benefits your business by streamlining
        lead processes, improving conversion rates, and enhancing sales and
        marketing efficiency.
      </p>
    ),
  },
];
const Hero6 = () => {
  return (
    <main className="min-h-screen max-h-auto flex flex-col items-center justify-start py-10 px-10 relative ">
      <div className="absolute lg:block hidden left-0 top-40  ">
        <Image src={leaf} alt={""} priority />
      </div>
      <h2 className="text-[#407BFF] text-5xl font-semibold">
        Frequently Asked questions
      </h2>
      <p className="mt-4">
        Everything you need to know about the product and billing.
      </p>

      <div className="md:w-[60%] w-full mt-16 border-b-2 rounded-lg">
        <Collapse defaultActiveKey={["1"]} ghost>
          {items.map((item) => (
            <Collapse.Panel
              key={item.key}
              header={item.label}
              className="border-2 p-2 text-base font-semibold"
            >
              {item.children}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </main>
  );
};

export default Hero6;
