"use client";
import { Avatar, Tooltip, Divider } from "antd";
import React from "react";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";

const Hero7 = () => {
  return (
    <main className="h-[50vh] flex  items-center justify-center ">
      <div className="bg-[#F9FAFB] h-full w-[90%] flex items-center flex-col gap-y-5 py-10">
        <Avatar.Group
          maxCount={2}
          size="large"
          maxStyle={{
            color: "#ffffff",
            backgroundColor: "#1462ff",
          }}
        >
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=17" />

          <Tooltip title="User" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=10"
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=50" />
        </Avatar.Group>

        <h2 className="text-4xl text-gray-600">Still have Questions ?</h2>
        <p>
          {'"'}Still have questions? Chat with our friendly team for
          personalized assistance and answers to all your inquiries.{'"'}
        </p>
        <button
          className=" border border-blue-500 px-5  text-sm rounded-sm text-blue-500 h-10 xs:w-fit w-full  whitespace-nowrap flex items-center justify-center
            hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          Get in touch {"-> "}
        </button>
      </div>
    </main>
  );
};

export default Hero7;
