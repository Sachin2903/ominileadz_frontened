"use client";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  openAddGroupModal,
  openUpdateGroupMemberModal,
} from "@/redux/features/modal/modalSlice";
const URL = process.env.NEXT_PUBLIC_BASE_URL!;
import { Dropdown, Menu, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { CallButton, Layout, Loader2, SubMenu } from "@/components";
import TableContainer from "@/components/TableContainer";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddGroupMember from "@/components/modals/AddGroupModal";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { setGroupIdValue } from "@/redux/features/tasksId/taskIdSlice";
import { GroupMemberType } from "@/src/@types";
import toast from "react-hot-toast";

interface IGroup {
  _id: string;
  groupName: string;
  leaderName: string;
  leaderId: string;
  members: string;
  status: string;
  slogan: string;
}
const CustomMenu: React.FC<{ record: IGroup }> = ({ record }) => {
  const dispatch = useAppDispatch();
  const handleArcheiveClick = async (e: any) => {
    if (e.key === "deleteGroup") {
      try {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (!accessToken || !refreshToken) {
          throw new Error(
            "Access token or refresh token is missing or invalid."
          );
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        await axios.patch(
          `${URL}/api/business/group/${record._id}`,
          { status: "archeive" },
          {
            headers,
          }
        );
        toast.success("Group Archeived...");
        window.location.reload();
      } catch (error) {
        console.error("Error updating group status:", error);
      }
    }
  };

  return (
    <Menu>
      {/* <Menu.Item key="edit" onClick={() => dispatch(openEditTeamMemberModal())}>
        Edit
      </Menu.Item> */}
      <Menu.Item
        key="addMember"
        onClick={() => {
          dispatch(setGroupIdValue(record._id));
          dispatch(openUpdateGroupMemberModal());
        }}
      >
        Update group
      </Menu.Item>
      {/* <Menu.Item key="explore" style={{ color: "blue" }}>
        Explore
      </Menu.Item> */}
      <Menu.Item
        key="deleteGroup"
        style={{ color: "red" }}
        onClick={handleArcheiveClick}
      >
        Archeive
      </Menu.Item>
    </Menu>
  );
};
const Page: React.FC = () => {
  const dispatch = useAppDispatch();

  const [groups, setGroups] = useState<GroupMemberType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const fetchGroups = async () => {
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
        `${URL}/api/business/group?keyword=${searchQuery}`,
        {
          headers,
        }
      );
      const groups: GroupMemberType[] = response.data;

      const filteredGroups = groups.filter(
        (group) => group.status !== "archeive"
      );

      setGroups(filteredGroups);
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
      render: (_text: string, record: any) => {
        const name = record.groupName;
        const initials = name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase">{initials}</a>;
      },
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "_id",
      className: "capitalize text-xs",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Leader",
      dataIndex: "leaderName",
      key: "_id",
      className: "capitalize text-xs ",
    },
    {
      title: "Slogan",
      dataIndex: "slogan",
      key: "_id",
      className: "capitalize text-xs",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "_id",
      className: "text-xs",
      render: (members: any) => {
        if (Array.isArray(members)) {
          return members.length;
        } else {
          return 0;
        }
      },
    },
    {
      title: "Status",
      key: "_id",
      dataIndex: "status",
      className: "text-xs",
      render: (status: string) => {
        let UStatus = status.toLowerCase();
        let color = UStatus === "active" ? "green" : "red";
        return (
          <Tag color={color} className="text-[11px] capitalize">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "_id",
      className: "text-xs",
      render: (text: string, record: any) => (
        <Dropdown
          overlay={<CustomMenu record={record} />}
          trigger={["click"]}
          placement="bottom"
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <BsThreeDotsVertical />
          </a>
        </Dropdown>
      ),
    },
  ];
  const pagination = {
    pageSize: 6,
  };
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
    fetchGroups();
  }, [searchQuery]);

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        <div className="flex items-center justify-end  border-b-2 border-b-slate-200 py-4">
          <div className="flex sm:gap-x-4 gap-x-2 ">
            <CallButton
              text="Add Group"
              onClick={() => dispatch(openAddGroupModal())}
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
            rowsData={groups}
            pagination={pagination}
          />
        )}
      </main>
    </>
  );
};

export default Page;
