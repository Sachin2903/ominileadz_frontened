"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  openEditTeamMemberModal,
  openUpdateTeamMemberModal,
} from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/store";
const URL = process.env.NEXT_PUBLIC_BASE_URL!;
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { openModal } from "@/redux/features/modal/modalSlice";
import { CallButton, Layout, Loader2, SubMenu } from "@/components";
import TableContainer from "@/components/TableContainer";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { setTeamIdValue } from "@/redux/features/tasksId/taskIdSlice";
import { IUserRoleArray, TeamMembersType } from "@/src/@types";
import { useAppSelector } from "@/redux/hooks";

const CustomMenu: React.FC<{ record: TeamMembersType }> = ({ record }) => {
  const dispatch = useAppDispatch();
  const handleMenuClick = (e: any) => {
    console.log("Clicked:", e.key);
  };

  return (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="edit"
        onClick={() => {
          dispatch(setTeamIdValue(record._id));
          dispatch(openUpdateTeamMemberModal());
        }}
      >
        Edit
      </Menu.Item>
      {/* <Menu.Item key="leave">Leave</Menu.Item> */}
    </Menu>
  );
};

const Page: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMembersType[]>();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);

      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        `${URL}/api/business/team?keyword=${searchQuery}`,
        { headers }
      );
      const teamsData: TeamMembersType[] = response.data;
      setTeamMembers(teamsData);
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
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      className: "text-xs",
      render: (_text: string, record: TeamMembersType) => {
        const name = record.name;
        const initials = name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase">{initials}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
      className: "capitalize w-52 text-xs",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-xs",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      className: "text-xs",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "text-xs",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "capitalize text-xs",
      render: (text: string, record: TeamMembersType) => {
        return (
          <div className="flex  flex-wrap">
            {record.role.map((role, index) => {
              return (
                <a
                  href="#"
                  key={index}
                  className="border-[0.5px] border-green-500 px-1 rounded text-gray-500 m-[0.1rem]"
                >
                  {role}
                </a>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "capitalize text-xs ",
    },
    // {
    //   title: "Explore",
    //   dataIndex: "explore",
    //   key: "explore",
    //   render: () => (
    //     <Link href="#" style={{ color: "gray" }}>
    //       Explore to Groups
    //     </Link>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={<CustomMenu record={record} />}
          trigger={["click"]}
          placement="bottomRight"
        >
          <a
            className="ant-dropdown-link text-xs"
            onClick={(e) => e.preventDefault()}
          >
            <BsThreeDotsVertical />
          </a>
        </Dropdown>
      ),
    },
  ];

  const subMenuData = [
    {
      id: 3,
      title: "Team Member",
      path: "/settings/team",
    },
    {
      id: 2,
      title: "leads source",
      path: "/settings/leadsSource",
    },
    {
      id: 4,
      title: "business details",
      path: "/settings/businessDetails",
    },
    {
      id: 5,
      title: "Groups",
      path: "/settings/groups",
    },
  ];
  useEffect(() => {
    fetchTeamMembers();
  }, [searchQuery]);

  return (
    <>
      <SubMenu data={subMenuData} />

      <main>
        <div className="flex items-center justify-end  border-b-2 border-b-slate-200 py-4 ">
          <div className="flex sm:gap-x-4 gap-x-2 ">
            <CallButton
              text="Add Member"
              onClick={() => dispatch(openModal())}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="py-10">
            <Loader2 />
          </div>
        ) : (
          <TableContainer
            columnsData={columns}
            rowsData={teamMembers}
            pagination={{
              pageSize: 10,
            }}
          />
        )}
      </main>
    </>
  );
};

export default Page;
