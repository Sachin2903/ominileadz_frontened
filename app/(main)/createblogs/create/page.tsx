"use client";
// Ensure you have the necessary types imported
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { BiLinkExternal } from "react-icons/bi";
import { PiVideo } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import crypto from "crypto";
import styles from "./writePage.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const BASEURL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const editor = useRef<any>(null);
  const uploadImage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "omnileadz");
      formData.append("folder", "blog");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dsuohtw1m/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.url);
          return responseData.url;
        } else {
          console.error("Image upload failed:", response.statusText);
          return "";
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return "";
      }
     
    }
  };
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      const upload = await uploadImage();
      console.log({
        title: title,
        desc: value,
        img: upload,
        slug: slugify(title),
        catSlug: catSlug || "style",
      });
      const res = await fetch(`${BASEURL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: value,
          imagebanner: upload,
          slug: slugify(title),
        }),
      });
      const data = await res.json();
      // console.log(data);

      if (data.status === 200) {
        router.push(`https://omni-leadz.vercel.app/blogs/${data.slug}`);
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };
  // console.log(media)
  return (
    <div className={`mt-6 ${styles.container}`}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Title"
            className={`pl-0 mt-8 md:mt-0 ${styles.input}`}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className={styles.select}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="style">style</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="culture">culture</option>
            <option value="travel">travel</option>
            <option value="coding">coding</option>
          </select>
          <div className={styles.editor}>
            <div className="flex">
              <button className={styles.button} onClick={() => setOpen(!open)}>
                <LuPlusCircle size={32} />
              </button>
              {open && (
                <div className={`w-fit ${styles.add}`}>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <button className={styles.addButton}>
                    <label htmlFor="image">
                      <CiImageOn size={32} />
                    </label>
                  </button>
                </div>
              )}
            </div>
            {file && (
              <div className="w-full flex justify-center ">
                <img
                  className="xl:max-w-[900px] "
                  src={URL.createObjectURL(file)}
                  alt="Uploaded Media"
                />
              </div>
            )}
            <div className="text-editor">
              <JoditEditor ref={editor} value={value} onChange={setValue} />
            </div>
          </div>
          <button className={styles.publish} onClick={handleSubmit}>
            Publish
          </button>
        </>
      )}
    </div>
  );
};

export default Page;
