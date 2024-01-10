import Link from "next/link";
import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import img from "../../../../../src/assets/images/landingPage/h5-img.png"
import { extractTextFromHTML } from "../utils/utils";
const Card = ({ key, item }: any) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div key={key} className={`border-2 max-w-3xl rounded-lg p-3 ${styles.container}`}>
        {img && (
          <div className={styles.imageContainer}>
            <Image src={img} alt="" fill className={styles.image} />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {/* 10-05-2017{"  "} */}
              {new Date(item.date).toLocaleDateString()}
              {/* {item.createdAt.substring(0, 10)} -{" "} */}
            </span>
            {/* <span className={`ml-2 ${styles.category}`}>CULTURE</span> */}
          </div>
          <Link href={`/blogs/${item.slug}`}>
            <h1 className=" text-2xl font-semibold line-clamp-1">
              {item.title}
            </h1>
          </Link>
          <div className={styles.desc}></div>
          <p className={`line-clamp-3 ${styles.desc}`}>
            {extractTextFromHTML(item.content)}...
          </p>
          {/* <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/> */}
          <Link href={`/blogs/${item.slug}`} className={styles.link}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
