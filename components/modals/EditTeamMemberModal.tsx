"use client";
import React, { useState } from "react";
import { FormRow, FormRowSelect, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import { closeEditTeamMemberModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const roles = ["caller", "member", "owner", "manager"];
// for post member
const iPostmember = {
  name: "",
  email: "",
  password: "",
  role: "",
  mobile: "",
  group: "",
};

const EditTeamMemberModal = () => {
  const dispatch = useDispatch();
  const [postMember, setPostMember] = useState(iPostmember);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostMember({ ...postMember, [name]: value });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostMember({ ...postMember, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/business/team`, postMember);
      console.log("POST Request Successful:", response.data);
      dispatch(closeEditTeamMemberModal());
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
      <div className="h-[90%] lg:w-[80%] w-[80%] bg-white  rounded-md  py-5 z-30 flex relative items-center justify-center ">
        <div
          className="absolute top-5 left-5 text-xl cursor-pointer"
          onClick={() => dispatch(closeEditTeamMemberModal())}
        >
          <GrClose />
        </div>
        <form className="  lg:w-[40%] w-[70%]" onSubmit={handleSubmit}>
          <h2 className="md:text-3xl text-xl mb-10 text-center font-semibold">
            Edit Team{" "}
            <span className="relative">
              Member
              <HorizontalBar />
            </span>
          </h2>
          <FormRow
            type="name"
            name="name"
            value={postMember.name}
            labelText="name"
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={postMember.email}
            labelText="email"
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={postMember.password}
            labelText="Password"
            handleChange={handleChange}
          />
          <FormRow
            type="number"
            name="mobile"
            value={postMember.mobile}
            labelText="Mobile"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="role"
            value={postMember.role}
            labelText="role"
            handleOptionChange={handleOptionChange}
            list={roles}
          />
          <FormRowSelect
            name="group"
            value={postMember.group}
            labelText="Add Group"
            handleOptionChange={handleOptionChange}
            list={["Alpha", "Beta", "Gama"]}
          />
          <div className="mt-10 mb-3 ">
            <button
              type="submit"
              className="bg-[#7F56D9] w-full rounded-md py-2 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditTeamMemberModal;
