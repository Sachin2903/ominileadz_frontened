"use client";
import React, { useState } from "react";
import { FormRow, FormRowSelect, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import { closeModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { WithContext as ReactTags } from "react-tag-input";
import { Tag } from "@/src/@types";

const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

// for post member
const iPostmember = {
  name: "",
  email: "",
  mobile: "",
  username: "",
  role: [],
  status: "active",
};

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TeamMemberModel = () => {
  const dispatch = useDispatch();
  const [postMember, setPostMember] = useState(iPostmember);

  const [tags, setTags] = useState<Tag[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "mobile" && value.length > 10) {
      toast.error("Maximum limit exceeded in Pincode");
      setPostMember({ ...postMember, [name]: "" });
    } else {
      setPostMember({ ...postMember, [name]: value });
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostMember({ ...postMember, [name]: value });
  };

  // react-text-input starts
  const handleDelete = (i: number): void => {
    setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag: Tag): void => {
    setTags((prevTags) => [...prevTags, tag]);
  };
  const handleTagClick = (index: number): void => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number): void => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  // react-text-input ends

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const postMemberWithTags = {
        ...postMember,
        ["role"]: tags.map((tag) => tag.text),
      };
      const response = await axios.post(
        `${URL}/api/business/team`,
        postMemberWithTags,
        { headers }
      );
      window.location.reload();
      toast.success("Member Added...");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
      }
      // unhandled non-AxiosError goes here
      throw error;
    }
  };

  return (
    <main className="h-full w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="h-auto md:h-[90%] lg:w-[80%] w-[80%] bg-white  rounded-md  py-5 z-30 flex relative items-center justify-center ">
        <div
          className="absolute top-5 left-5 text-xl cursor-pointer"
          onClick={() => dispatch(closeModal())}
        >
          <GrClose />
        </div>
        <form
          className=" flex flex-col space-y-3 lg:w-[40%] w-[70%]"
          onSubmit={handleSubmit}
        >
          <h2 className="md:text-3xl text-xl mb-5 text-center font-semibold">
            Add Team{" "}
            <span className="relative">
              Member
              <HorizontalBar />
            </span>
          </h2>
          <FormRow
            type="text"
            name="name"
            value={postMember.name}
            labelText="name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="username"
            value={postMember.username}
            labelText="Username"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="email"
            value={postMember.email}
            labelText="email"
            handleChange={handleChange}
          />
          <FormRow
            type="tel"
            name="mobile"
            value={postMember.mobile}
            labelText="Mobile"
            handleChange={handleChange}
          />
          <ReactTags
            tags={tags}
            suggestions={["user", "admin", "manager"].map((text) => ({
              id: text,
              text,
            }))}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition as unknown as (tag: Tag) => void}
            handleDrag={
              handleDrag as unknown as (
                tag: Tag,
                currPos: number,
                newPos: number
              ) => void
            }
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Add Roles...."
            classNames={{
              tags: " space-y-2 px-2  rounded border-[0.5px] ",
              tagInput: " w-full ",
              selected: "text-white  w-full",
              tag: "bg-gray-100 border-[1px]  rounded inline-block text-gray-700 text-sm capitalize px-1 py-0.5 mr-2 mb-2 ",
              remove: "text-gray-500 hover:text-red-500 cursor-pointer",
              suggestions:
                "bg-white  shadow-md mt-2 py-2 w-full cursor-pointer capitalize text-xs",
              tagInputField:
                "w-full outline-none  border-[0.5px] px-2 py-0.5 text-sm rounded-sm mb-2",
            }}
          />

          <FormRowSelect
            name="status"
            value={postMember.status}
            labelText="Status"
            handleOptionChange={handleOptionChange}
            list={["active", "locked", "blocked", "pending", "deleted"]}
          />

          <div className="pt-3">
            <button
              type="submit"
              className="bg-[#7F56D9] w-full  rounded-md py-1.5 xs:py-2 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TeamMemberModel;
