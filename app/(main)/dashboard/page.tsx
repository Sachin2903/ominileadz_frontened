"use client";
import Image from "next/image";
import stats from "../../../src/assets/images/dashboard/stats.png";
import { useEffect, useState } from "react";
import { ILeadsState, IMemberLead, Member } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import axios, { AxiosError } from "axios";
import { Loader2 } from "@/components";
import TableContainer from "@/components/TableContainer";
import { openMemberLeadsInfoModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setMemberLeadRecord } from "@/redux/features/taskRecord/taskRecordSlice";
import { useAppSelector } from "@/redux/store";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface IStatsDataItem {
  id: number;
  title: string;
  text: number;
}

interface IleadsData {
  totalLeads: number;
  last30DaysLeads: number;
  last7DaysLeads: number;
  assignedLeads: number;
}

let statsDataInitialState: IStatsDataItem[] = [
  {
    id: 0,
    title: "Total Leads",
    text: 0,
  },
  {
    id: 1,
    title: "Last 30 days Leads",
    text: 0,
  },
  {
    id: 2,
    title: "Last 7 days Leads",
    text: 0,
  },
  {
    id: 3,
    title: "Total Assigned Leads",
    text: 0,
  },
  {
    id: 4,
    title: "Total PO Leads",
    text: 0,
  },
  {
    id: 5,
    title: "Total Quoted Leads",
    text: 0,
  },
  {
    id: 6,
    title: "Total Regretted Leads",
    text: 0,
  },
  {
    id: 7,
    title: "Total Send Details Leads",
    text: 0,
  },
];

const HomePage = () => {
  const [leadsData, setLeadsData] = useState({
    totalLeads: 0,
    last30DaysLeads: 0,
    last7DaysLeads: 0,
    assignedLeads: 0,
    poLeads: 0,
    quotedLeads: 0,
    regrettedLeads: 0,
    sendDetailsLeads: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState<IStatsDataItem[]>(
    statsDataInitialState
  );

  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      className: "text-xs",
      render: (_text: string, record: any) => {
        const name = record.assignedTo;
        const initials = name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase w-5 text-xs">{initials}</a>;
      },
    },
    {
      title: "Member Name",
      dataIndex: "assignedTo",
      key: "assignedTo",
      className: "capitalize text-xs",
      render: (text: string) => <div className="capitalize p-0">{text}</div>,
    },
    {
      title: "Leads Assigned",
      dataIndex: "count",
      key: "count",
      className: "capitalize text-xs",
      render: (text: number) => <div className="capitalize  p-0">{text}</div>,
    },

    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      className: "text-xs",
      render: (text: string, record: IMemberLead) => (
        <button
          className="bg-[#0017F7] text-xs hover:bg-blue-500 text-white tracking-wider py-1 px-2 rounded"
          onClick={() => {
            dispatch(setMemberLeadRecord(record));
            dispatch(openMemberLeadsInfoModal());
          }}
        >
          Details
        </button>
      ),
    },
  ];

  const fetchLeadsData = async () => {
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
        `${URL}/api/leads/findAllLeadsDetailsCount`,
        {
          headers,
        }
      );
      const leadsData = response.data;
      const {
        totalLeadsCount,
        last30DaysLeadsCount,
        last7DaysLeadsCount,
        totalAssignedLeads,
        totalPoLeads,
        totalQuotedLeads,
        totalRegrettedLeads,
        totalSendDetailsLeads,
      } = leadsData;

      console.log("leads Data", leadsData);
      setLeadsData({
        totalLeads: totalLeadsCount,
        last30DaysLeads: last30DaysLeadsCount,
        last7DaysLeads: last7DaysLeadsCount,
        assignedLeads: totalAssignedLeads,
        poLeads: totalPoLeads,
        quotedLeads: totalQuotedLeads,
        regrettedLeads: totalRegrettedLeads,
        sendDetailsLeads: totalSendDetailsLeads,
      });

      const updatedStatsData = statsData.map((item) => {
        switch (item.title) {
          case "Total Leads":
            return { ...item, text: totalLeadsCount };
          case "Last 30 days Leads":
            return { ...item, text: last30DaysLeadsCount };
          case "Last 7 days Leads":
            return { ...item, text: last7DaysLeadsCount };
          case "Total Assigned Leads":
            return { ...item, text: totalAssignedLeads };
          // Add cases for PO Leads, Quoted Leads, Regretted Leads, and Send Details Leads
          case "Total PO Leads":
            return { ...item, text: totalPoLeads };
          case "Total Quoted Leads":
            return { ...item, text: totalQuotedLeads };
          case "Total Regretted Leads":
            return { ...item, text: totalRegrettedLeads };
          case "Total Send Details Leads":
            return { ...item, text: totalSendDetailsLeads };
          default:
            return item;
        }
      });

      setStatsData(updatedStatsData);
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

  useEffect(() => {
    fetchLeadsData();
  }, []);

  return (
    <>
      <main className="">
        <h2 className="text-xl font-semibold tracking-wider mt-5">Overview</h2>
        <hr className="my-3" />

        {isLoading ? (
          <div className="py-10">
            <Loader2 />
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-4 grid-cols-2  my-2 gap-5 xl:px-20  lg:px-10 md:px-5 px-0">
              {statsData &&
                statsData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white px-5 py-3 flex gap-x-4 shadow-lg items-center  gap-y-3"
                    >
                      <Image
                        src={stats}
                        alt=""
                        className="lg:h-16 lg:w-16 h-12 w-12"
                      />
                      <div className="flex flex-col gap-y-2">
                        <h2 className="lg:text-xs text-[0.6rem] text-slate-500">
                          {item.title}
                        </h2>
                        <h1 className="lg:text-3xl  font-semibold text-slate-700">
                          {item.text}
                        </h1>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className=" w-full p-5  shadow">
              <h2 className="text-xl font-semibold font-sans tracking-wide text-gray-600">
                Leads Info
              </h2>
              {/* <TableContainer
                columnsData={columns}
                rowsData={membersData}
                pagination={{ pageSize: 8 }}
              /> */}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
