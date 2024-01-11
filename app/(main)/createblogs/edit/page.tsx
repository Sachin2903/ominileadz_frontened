"use client";
// Ensure you have the necessary types imported
import { NextPage } from "next";
// import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { BiLinkExternal } from "react-icons/bi";
import { PiVideo } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import styles from "./writePage.module.css";
import crypto from "crypto";
import toast, { Toaster } from "react-hot-toast";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const BASEURL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const router = useRouter();

  const params: any = useSearchParams();
  const slug: any = params.get("slug");
  // console.log(slug);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null); // Change 'file' to 'image'
  const [media, setMedia] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const editor = useRef<any>(null);
  const [slugtext, setSlug] = useState(slug);
  const pathname = usePathname();
  useEffect(() => {
    // if(value ===""  && pathname==="/createblogs/edit"){
    //   router.push("/createblogs/myblogs")
    // }
    const getBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASEURL}/blog/${slug}`);
        if (response.ok) {
          const responseData = await response.json();
          // setMedia(responseData.url);
          setValue(responseData.blog.content);
          setMedia(responseData.blog.imagebanner);
          setTitle(responseData.blog.title);
          // console.log(responseData);
          setLoading(false);
        } else {
          console.error("Fetching failed:", response.statusText);
          router.push("/createblogs/myblogs");
        }
      } catch (error) {
        console.error("Fetch failed :", error);
        router.push("/createblogs/myblogs");
      }
    };

    getBlog();
  }, []);

  // getting public id and apikey
  const getPublicIdFromUrl = (url: string): string => {
    const matches = url.match(/\/([^\/]+)\.[a-z]+$/);
    return matches ? matches[1] : "";
  };

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (publicId: string, apiSecret: string) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };
  const uploadImage = async () => {
    setLoading(true);
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
          setMedia(responseData.url);
          // console.log(responseData.url);
          setLoading(false);
          toast.success("New Image Uploaded Successfully!");
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
    return media;
  };
  // UseEffect to upload image when 'file' changes
  // useEffect(() => {

  //   // Invoke the uploadImage function when 'file' changes
  //   uploadImage();
  // }, [file]);

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
    const newImage = await uploadImage();
    console.log({
      title: title,
      desc: value,
      img: newImage,
      slug: slugify(title),
      catSlug: catSlug || "style",
    });
    try {
      if (newImage !== "" && newImage !== undefined && newImage !== media) {
        const cloudName = "dsuohtw1m";
        const apiKey = "661922946949481";
        const apiSecret = "7WcVRcG--Kb0KVXhiJa8_o6YnqQ";
        // const publicId = "tofmwnxizaxx0qtg01js";
        const publicId = "blog/" + getPublicIdFromUrl(media);
        console.log(publicId);
        const timestamp = new Date().getTime();
        const signature = generateSHA1(generateSignature(publicId, apiSecret));
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

        const res = await axios.post(url, {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        });
        console.log(res);
      }
    } catch (err) {
      console.log("error in deleting");
    }
    try {
      const res = await fetch(`${BASEURL}/blog/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: value,
          imagebanner: newImage,
          slug: slugify(title),
        }),
      });
      const data = await res.json();
      // console.log(data);
      // window.location.reload();
      if (data.status === 200) {
        toast.success("Successfully Edited!");
      }
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };
  // console.log(media);

  return (
    <div className={`mt-6 ${styles.container}`}>
      <input
        type="text"
        placeholder="Title"
        value={title}
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
        {file ? (
          <div className="w-full flex justify-center ">
            <img
              className="xl:max-w-[900px] "
              src={URL.createObjectURL(file)}
              alt="Uploaded Media"
            />
          </div>
        ) : (
          media && (
            <div className="w-full flex justify-center ">
              <img
                className="xl:max-w-[900px] "
                src={media}
                alt="Uploaded Media"
              />
            </div>
          )
        )}
        <div className="text-editor">
          <JoditEditor ref={editor} value={value} onChange={setValue} />
        </div>
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Edit Blog
      </button>
    </div>
  );
};

export default Page;
