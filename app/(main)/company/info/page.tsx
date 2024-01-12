"use client";
import { CallButton, Layout, Loader2, SubMenu } from "@/components";
import TableContainer from "@/components/TableContainer";
import { openAddCompanyInfoModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ICompanyObject, ILeadsState } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICompanyObject[]>([]);
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      className: "w-10 text-xs",
      render: (text: string, record: any) => {
        const initials = record.name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase w-5 text-xs">{initials}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "capitalize w-32 text-xs",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      className: "capitalize text-xs",
    },
    {
      title: "About Us",
      dataIndex: "aboutUs",
      key: "aboutUs",
      className: "capitalize w-40 text-xs",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      className: "capitalize text-xs",
    },
    {
      title: "Annual Revenue",
      dataIndex: "annualRevenue",
      key: "annualRevenue",
      className: "capitalize text-xs",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      className: "capitalize text-xs",
    },
    {
      title: "Ownership",
      dataIndex: "ownership",
      key: "ownership",
      className: "capitalize text-xs",
    },
    {
      title: "Lifecycle Stage",
      dataIndex: "lifecycleStage",
      key: "lifecycleStage",
      className: "text-xs",
    },

    // {
    //   title: "Source",
    //   dataIndex: "source",
    //   key: "source",
    //   className: "text-xs capitalize",
    // },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      className: "text-xs capitalize",
      render: (text: string, record: ILeadsState) => (
        <button
          className="bg-[#0017F7] text-xs hover:bg-blue-500 text-white tracking-wider py-1 px-2 rounded"
          //  onClick={() => {
          //    dispatch(setEditContactIdValue(record._id));
          //    dispatch(openEditContactDetailsModal());
          //  }}
        >
          Details
        </button>
      ),
    },
  ];

  const fetchCompaniesData = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(
        `${URL}/api/company?keyword=${searchQuery}`,
        {
          headers,
        }
      );

      let companiesData: ICompanyObject[] = response.data;
      // console.log(companiesData);
      setData(companiesData);
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
    fetchCompaniesData();
  }, [searchQuery]);

  const subMenuData = [
    {
      id: 1,
      title: "Company Info",
      path: "/company/info",
    },
  ];

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        <div className="flex items-center justify-end  border-b-2 border-b-slate-200 py-4 ">
          <div className="flex sm:gap-x-4 gap-x-2 ">
            <CallButton
              text="Add Company"
              onClick={() => dispatch(openAddCompanyInfoModal())}
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
              pagination={{
                pageSize: 10,
                onChange: ()=>{},
              }}
               currentPage={1} totalItems={data.length} 

            />
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
