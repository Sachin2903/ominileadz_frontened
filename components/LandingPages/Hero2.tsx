import Image from "next/image";
import React from "react";
import cloud from "../../src/assets/images/landingPage/h2-cloud.png";

const Hero2 = () => {
  return (
    <main className="sm:h-96 h-60 max-w-screen overflow-hidden ">
      <div className="w-full h-96  flex justify-center  relative space-y-20 ">
        <h2 className=" h-fit text-[#407BFF] md:w-[50%] w-[90%]  lg:text-5xl text-3xl mt-16 text-center   font-semibold ">
          Why Choose Our Leads Management Software
        </h2>

        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute top-52 left-96 hidden sm:block"
        />
        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute top-60 right-[40rem] hidden xl:block"
        />
        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute top-36 right-60 hidden lg:block"
        />
        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute top-16 right-0 hidden md:block"
        />
        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute bottom-20 -right-20 hidden md:block"
        />
        <Image
          src={cloud}
          alt={"img"}
          priority
          className="absolute top-20 right-14 md:hidden"
        />
      </div>
    </main>
  );
};

export default Hero2;
