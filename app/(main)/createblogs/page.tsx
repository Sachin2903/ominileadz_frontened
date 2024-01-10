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

import styles from "./writePage.module.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null); // Change 'file' to 'image'
  const [media, setMedia] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");

  const editor = useRef<any>(null);

  // UseEffect to upload image when 'file' changes
  useEffect(() => {
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "omnileadz");
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
            setMedia(responseData.url);
            console.log(responseData.url);
          } else {
            console.error("Image upload failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };

    // Invoke the uploadImage function when 'file' changes
    uploadImage();
  }, [file]);

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
    console.log({
      title: title,
      desc: value,
      img: media,
      slug: slugify(title),
      catSlug: catSlug || "style",
    });

    try {
      const res = await fetch(`${URL}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: value,
          imagebanner: media,
          slug: slugify(title),
        }),
      });
      setMedia("");
      const data = await res.json();
      // console.log(data);

      if (data.status === 200) {
        router.push(`/blogs/${data.slug}`);
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };
  console.log(media)
  return (
    <div className={`mt-6 ${styles.container}`}>
      <input
        type="text"
        placeholder="Title"
        className={`pl-0 ${styles.input}`}
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
        {media && <div className="w-full flex justify-center ">
        <img className="xl:max-w-[900px] "
          src={media}
          alt="Uploaded Media"
        />
        </div>}
        <div className="text-editor">
          <JoditEditor ref={editor} value={value} onChange={setValue} />
        </div>
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default Page;
