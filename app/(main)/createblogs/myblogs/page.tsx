// import CardList from "@/components/blogComponents/cardList/CardList";
"use client";
import { useState, useEffect } from "react";
import Card from "./components/card";
import Link from "next/link";

const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const Myblogs = () => {
  const [blogcontent, setBlogcontent] = useState([]);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await fetch(`${URL}/blog/user/omnileadz@gmail.com`);
        if (response.ok) {
          const responseData = await response.json();
          setBlogcontent(responseData);
          // console.log(responseData);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error in fetching blogs", error);
      }
    };
    getBlog();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mt-5 flex flex-col justify-center">
      {blogcontent.length > 0 && blogcontent.map((item: any, key: any) => (
        <Card key={key} item={item} />
      ))}
    </div>
    </div>
  );
};

export default Myblogs;
