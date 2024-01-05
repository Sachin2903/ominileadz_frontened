"use client";
import { CallButton, Layout, Loader2, SubMenu } from "@/components";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
const URL = process.env.NEXT_PUBLIC_BASE_URL!;
import {
  openBusinessDetailsModal,
  openUpdateBusinessDetailsModal,
} from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/store";
import TableContainer from "@/components/TableContainer";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { IBusinessType } from "@/src/@types";
import { setBusinessIdValue } from "@/redux/features/tasksId/taskIdSlice";

const Page = () => {
  const [values, setValues] = useState<IBusinessType[]>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusinessDetails = async () => {
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

      const response = await axios.get(`${URL}/api/business/details`, {
        headers,
      });
      const details = response.data;

      setValues(details);
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
      render: (_text: string, record: any) => {
        const initials = record.name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase">{initials}</a>;
      },
      className: "capitalize w-24 text-xs",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
      className: "capitalize text-xs",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "capitalize text-xs",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "text-xs",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-xs",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      className: "capitalize text-xs",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text: string, record: IBusinessType) => (
        <button
          className="bg-[#0017F7] text-xs hover:bg-blue-500 text-white tracking-wider py-1 px-2 rounded"
          onClick={() => {
            dispatch(setBusinessIdValue(record._id));
            dispatch(openUpdateBusinessDetailsModal());
          }}
        >
          Details
        </button>
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
    fetchBusinessDetails();
  }, []);

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        {/* <div className="flex items-center justify-end  border-b-2 border-b-slate-200 py-4">
        <CallButton
          text="Add Details"
          onClick={() => dispatch(openBusinessDetailsModal())}
        />
      </div> */}
        {isLoading ? (
          <div className="py-10">
            <Loader2 />
          </div>
        ) : (
          <TableContainer
            columnsData={columns}
            rowsData={values}
            pagination={{ pageSize: 8 }}
          />
        )}
      </main>
    </>
  );
};

export default Page;
