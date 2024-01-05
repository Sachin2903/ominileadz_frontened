"use client";
import React, { useEffect, useState } from "react";
import { FormRow, FormRowSelect, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import { closeAddGroupModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
import { WithContext as ReactTags } from "react-tag-input";
import CloseGrButton from "../buttons/CloseGrButton";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { TeamMembersType } from "@/src/@types";
// for post member
interface ITeamMember {
  _id: string;
  name: string;
}
const iPostGroup = {
  groupName: "",
  leaderId: "",
  leaderName: "",
  slogan: "",
  status: "active",
  members: [],
};
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const convertTeamMembersToTags: any = (teamMembers: ITeamMember[]) => {
  return teamMembers.map((teamMember) => ({
    id: teamMember._id,
    text: teamMember.name,
  }));
};

const dummy: ITeamMember[] = [];

const AddGroupMember = () => {
  const dispatch = useDispatch();
  const [postGroup, setPostGroup] = useState(iPostGroup);
  const [tags, setTags] = useState(convertTeamMembersToTags(dummy));
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>();
  const [leadersList, setleadersList] = useState<string[]>([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostGroup({ ...postGroup, [name]: value });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostGroup({ ...postGroup, [name]: value });
  };

  // react-text-input starts
  const handleDelete = (i: number): void => {
    setTags(tags.filter((tag: ITeamMember, index: number) => index !== i));
  };

  const handleAddition = (tag: { id: string; text: string }): void => {
    setTags([...tags, tag]);
  };
  const handleTagClick = (index: number): void => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleDrag = (
    tag: ITeamMember,
    currPos: number,
    newPos: number
  ): void => {
    const newTag = {
      id: tag._id, // Use the _id from ITeamMember as the id
      text: tag.name, // Use the name from ITeamMember as the text
    };

    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, newTag);

    // re-render
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
      const dataToSend = {
        ...postGroup,
        members: tags.map((tag: ITeamMember) => tag), // Extract the text from tags
      };

      const response = await axios.post(
        `${URL}/api/business/group`,
        dataToSend,
        { headers }
      );
      window.location.reload();
      setPostGroup(iPostGroup);
      dispatch(closeAddGroupModal());
      toast.success("Group Added Successfully");
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

  const fetchTeamMembers = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/business/team?keyword`, {
        headers,
      });

      const teamsData: TeamMembersType[] = response.data;

      const temp = [...teamsData];
      const list = temp.map((member) => member.name);
      setleadersList(list);
      const newData = teamsData.map((item) => ({
        _id: item._id,
        name: item.name,
      }));

      setTeamMembers(newData);
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

  useEffect(() => {
    fetchTeamMembers();
  }, []);
  return (
    <main className="h-screen w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="max-h-[88%] h-[87%] relative w-[80%] bg-white  rounded-md  z-30 flex justify-center items-center overflow-y-auto">
        <CloseGrButton
          className="left-5"
          onClick={() => dispatch(closeAddGroupModal())}
        />
        <form
          className="w-full h-auto md:px-36 lg:px-52 xl:px-72 px-10 flex flex-col space-y-3 overflow-y-auto "
          onSubmit={handleSubmit}
        >
          <h2 className="md:text-3xl text-xl  text-center font-semibold">
            Add{" "}
            <span className="relative">
              Group
              <HorizontalBar />
            </span>
          </h2>
          <FormRow
            type="text"
            name="groupName"
            value={postGroup.groupName}
            labelText="Group Name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="leaderId"
            value={postGroup.leaderId}
            labelText="Leader Id"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="leaderName"
            value={postGroup.leaderName}
            labelText="Leader Name"
            handleOptionChange={handleOptionChange}
            list={leadersList}
          />
          <FormRow
            type="text"
            name="slogan"
            value={postGroup.slogan}
            labelText="Slogan"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="status"
            value={postGroup.status}
            labelText="Status"
            handleOptionChange={handleOptionChange}
            list={["active", "non-active", "archeive"]}
          />
          <ReactTags
            tags={tags}
            suggestions={
              teamMembers ? convertTeamMembersToTags(teamMembers) : []
            }
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={
              handleAddition as unknown as (tag: {
                id: string;
                text: string;
              }) => void
            }
            handleDrag={
              handleDrag as unknown as (
                tag: { id: string; text: string },
                currPos: number,
                newPos: number
              ) => void
            }
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Add Members..."
            classNames={{
              tags: " space-y-2 px-2 rounded border-[0.5px] ",
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

          <div className=" mb-3 ">
            <button
              type="submit"
              className="bg-[#7F56D9] w-full mt-2 rounded-md py-2 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddGroupMember;
