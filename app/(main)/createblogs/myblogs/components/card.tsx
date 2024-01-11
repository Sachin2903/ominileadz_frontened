import Link from "next/link";
import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import img from "../../../../../src/assets/images/landingPage/h5-img.png";
import { extractTextFromHTML } from "../utils/utils";
import toast from "react-hot-toast";
import crypto from "crypto";
import axios from "axios";
const BASEURL: string = process.env.NEXT_PUBLIC_BASE_URL!;
const Card = ({ key, item }: any) => {
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
  const handledelete = async (slug: string) => {
    try {
      if (item.imagebanner !== "" && item.imagebanner !== undefined) {
        const cloudName = "dsuohtw1m";
        const apiKey = "661922946949481";
        const apiSecret = "7WcVRcG--Kb0KVXhiJa8_o6YnqQ";
        const publicId = "blog/" + getPublicIdFromUrl(item.imagebanner);
        const timestamp = new Date().getTime();
        const signature = generateSHA1(generateSignature(publicId, apiSecret));
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

        const res = await axios.post(url, {
          public_id: publicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        });
        // console.log(res);
      }
    } catch (err) {
      console.log("error in deleting");
    }
    try {
      const response = await fetch(`${BASEURL}/blog/${slug}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
      } else {
        console.error("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error in fetching blogs", error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div className="flex flex-col justify-center max-w-full">
      <div
        key={key}
        className={`border-2 max-w-3xl rounded-lg p-3 ${styles.container}`}
      >
        <div className="w-1/2">
          {item?.imagebanner && (
            <div className={styles.imageContainer}>
              <Image
                src={item.imagebanner}
                alt=""
                fill
                className={`rounded-lg ${styles.image}`}
              />
            </div>
          )}
        </div>
        <div className={`w-1/2 ${styles.textContainer}`}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {/* 10-05-2017{"  "} */}
              {new Date(item.date).toLocaleDateString()}
              {/* {item.createdAt.substring(0, 10)} -{" "} */}
            </span>
            {/* <span className={`ml-2 ${styles.category}`}>CULTURE</span> */}
          </div>
          <Link href={`https://omni-leadz.vercel.app/blogs/${item.slug}`}>
            <h1 className=" text-2xl font-semibold line-clamp-1">
              {item.title}
            </h1>
          </Link>
          <div className={styles.desc}></div>
          <p className={`line-clamp-3 ${styles.desc}`}>
            {extractTextFromHTML(item.content)}...
          </p>
          {/* <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/> */}
          <div className="flex justify-between items-center">
            <Link
              href={`https://omni-leadz.vercel.app/blogs/${item.slug}`}
              className={`border-b-2 border-[#6238df]  ${styles.link}`}
            >
              Read More
            </Link>
            <Link
              href={`/createblogs/edit?slug=${item.slug}`}
              className={`border-b-2 border-[#249335]  ${styles.link}`}
            >
              Edit
            </Link>
            <button
              onClick={() => handledelete(item.slug)}
              className={`border-b-2 border-[#cd2d2d]  ${styles.link}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
