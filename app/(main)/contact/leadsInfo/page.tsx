"use client";
import { CallButton, Loader2, SubMenu } from "@/components";
import TableContainer from "@/components/TableContainer";
import { IContact, ILeadsState } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { Layout } from "../../../../components";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  openAddContactDetailsModal,
  openEditContactDetailsModal,
} from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  setContactPersonId,
  setEditContactIdValue,
} from "@/redux/features/tasksId/taskIdSlice";
import { useAppSelector } from "@/redux/store";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IContact[]>([]);
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const fetchContactsData = async () => {
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
        `${URL}/api/contacts?keyword=${searchQuery}`,
        { headers }
      );
      const contacts: IContact[] = response.data;

      setData(contacts);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
      } else {
        console.error("Unhandled error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      className: "w-6 text-xs",
      render: (text: string, record: any) => {
        const initials = record.fullName
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase w-5 text-xs">{initials}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      className: "capitalize w-32 text-xs",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-xs",
      render: (text: string) => (
        <div className="md:w-28 xs:w-20 break-text w-16 ">{text}</div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "capitalize w-36 text-xs",
    },
    {
      title: "Role",
      dataIndex: "title",
      key: "title",
      className: "capitalize  text-xs w-32",
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      className: "capitalize w-36 text-xs",
    },

    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      className: "text-xs capitalize",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      className: "text-xs capitalize",
      render: (text: string, record: ILeadsState) => (
        <button
          className="bg-[#0017F7] text-xs hover:bg-blue-500 text-white tracking-wider py-1 px-2 rounded"
          onClick={() => {
            dispatch(setContactPersonId(record._id));
            dispatch(openEditContactDetailsModal());
          }}
        >
          Details
        </button>
      ),
    },
  ];
  const subMenuData = [
    {
      id: 1,
      title: "Leads Info",
      path: "/contact/leadsInfo",
    },
    {
      id: 2,
      title: "Bulk Imports",
      path: "/contact/bulkImports",
    },
  ];

  useEffect(() => {
    fetchContactsData();
  }, [searchQuery]);

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        <div className="flex items-center justify-end  border-b-2 border-b-slate-200 py-4 ">
          <div className="flex sm:gap-x-4 gap-x-2 ">
            <CallButton
              text="Add Contact"
              onClick={() => dispatch(openAddContactDetailsModal())}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="py-10">
            <Loader2 />
          </div>
        ) : (
          <div>
            <TableContainer
              columnsData={columns}
              rowsData={data}
              pagination={{ pageSize: 10 }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
