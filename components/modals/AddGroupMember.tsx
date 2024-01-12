"use client";
import React, { useEffect, useRef, useState } from "react";
import { FormRow, FormRowSelect, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import {
  closeAddGroupModal,
  closeUpdateGroupMemberModal,
} from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import toast from "react-hot-toast";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
import { WithContext as ReactTags } from "react-tag-input";
import CloseGrButton from "../buttons/CloseGrButton";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { GroupMemberType, Member, TeamMembersType } from "@/src/@types";
// for post member
interface ITeamMember {
  id: string;
  text: string;
}

interface AddGroupMemberProps {
  groupId: string;
}

const iPostGroup = {
  _id: "",
  groupName: "",
  leaderName: "",
  leaderId: "",
  slogan: "",
  status: "active",
  members: [],
  createdAt: "",
  updatedAt: "",
  __v: 0,
};
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const convertTeamMembersToTags: any = (teamMembers: ITeamMember[]) => {
  return teamMembers.map((teamMember) => ({
    id: teamMember.id,
    text: teamMember.text,
  }));
};

const dummy: ITeamMember[] = [];

const UpdateGroupMemberModal: React.FC<AddGroupMemberProps> = ({ groupId }) => {
  const dispatch = useDispatch();
  const [postGroup, setPostGroup] = useState<GroupMemberType>(iPostGroup);
  const [tags, setTags] = useState(convertTeamMembersToTags(dummy));
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>();
  const [leadersList, setleadersList] = useState<string[]>([""]);
  const reactTagsRef = useRef<any>(null);

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
    setTags(tags.filter((tag: Member, index: number) => index !== i));
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
    // const newTag = {
    //   id: tag._id, // Use the _id from ITeamMember as the id
    //   text: tag.text, // Use the name from ITeamMember as the text
    // };

    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

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
        members: tags.map((tag: Member) => tag), // Extract the text from tags
      };

      const response = await axios.patch(
        `${URL}/api/business/group/${groupId}`,
        dataToSend,
        { headers }
      );
      toast.success("Group Updated....");
      window.location.reload();
      dispatch(closeUpdateGroupMemberModal());
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

      const newData: ITeamMember[] = teamsData.map((item) => ({
        id: item._id,
        text: item.name,
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
  const fetchGroupById = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/business/group/${groupId}`, {
        headers,
      });

      const GroupData: GroupMemberType = response.data;
      if (GroupData) {
        const newData: ITeamMember[] = GroupData.members;
        setTags(newData);

        setPostGroup(GroupData);
      } else {
        console.error("GroupData is undefined or has unexpected structure.");
      }
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
    fetchGroupById();
  }, []);
  return (
    <main className="h-screen w-full flex items-center justify-center z-[300] fixed bg-black bg-opacity-60">
      <div className="max-h-[88%] h-[87%] relative w-[80%] bg-white  rounded-md  z-30 flex justify-center items-center overflow-y-auto">
        <CloseGrButton
          className="left-5"
          onClick={() => dispatch(closeUpdateGroupMemberModal())}
        />
        <form
          className="w-full h-auto md:px-36 lg:px-52 xl:px-72 px-10 flex flex-col space-y-3 overflow-y-auto "
          onSubmit={handleSubmit}
        >
          <h2 className="md:text-3xl text-xl  text-center font-semibold">
            Update{" "}
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
          <FormRowSelect
            name="leaderName"
            value={postGroup.leaderName}
            labelText="Leader Name"
            handleOptionChange={handleOptionChange}
            list={leadersList}
          />
          <FormRow
            type="text"
            name="leaderId"
            value={postGroup.leaderId}
            labelText="Leader Id"
            handleChange={handleChange}
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
            ref={reactTagsRef}
            tags={tags}
            suggestions={teamMembers ? teamMembers : []}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={
              handleAddition as unknown as (tag: ITeamMember) => void
            }
            handleDrag={
              handleDrag as unknown as (
                tag: ITeamMember,
                currPos: number,
                newPos: number
              ) => void
            }
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder="Add Members"
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

export default UpdateGroupMemberModal;
