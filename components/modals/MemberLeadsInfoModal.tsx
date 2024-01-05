import React, { useEffect, useState } from "react";
import { HorizontalBar } from "..";
import { closeMemberLeadsInfoModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import CloseGrButton from "../buttons/CloseGrButton";
import { ILeadsState, IMemberLead } from "@/src/@types";
import TableContainer from "../TableContainer";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { getUserRole } from "@/src/utils/getUserRole";
import axios, { AxiosError } from "axios";
import { formatDate } from "@/src/utils/formatDate";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface IMemberLeadsInfoModalProps {
  record: IMemberLead;
}

const filterLeadsByLeadIds = (
  leadsData: ILeadsState[],
  memberLead: IMemberLead
) => {
  const filteredLeads: ILeadsState[] = [];

  memberLead.leadIds.forEach((leadId) => {
    // Find the lead with the matching _id
    const matchingLead = leadsData.find((lead) => lead._id === leadId);

    // If a matching lead is found, add it to the filteredLeads array
    if (matchingLead) {
      filteredLeads.push(matchingLead);
    }
  });

  return filteredLeads;
};

const MemberLeadsInfoModal: React.FC<IMemberLeadsInfoModalProps> = ({
  record,
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<ILeadsState[]>([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      className: "text-xs",
      render: (_text: string, record: any) => {
        const name = record.companyName;
        const initials = name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase w-5 text-xs">{initials}</a>;
      },
    },
    {
      title: "Title",
      dataIndex: "subject",
      key: "subject",
      className: "capitalize w-32 text-xs",
      render: (text: string) => (
        <div className="capitalize w-32  p-0">{text}</div>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "company",
      className: "capitalize w-32 text-xs",
    },
    // {
    //   title: "Product Name",
    //   dataIndex: "productName",
    //   key: "productName",
    //   className: "capitalize w-32 text-xs",
    // },
    {
      title: "Lead Date",
      dataIndex: "leadDate",
      key: "leadDate",
      className: "capitalize text-xs",
      render: (text: string) => <a>{formatDate(text)}</a>,
    },
    {
      title: "Contact Person",
      dataIndex: "contactPersonName",
      key: "contactPersonName",
      className: "capitalize text-xs",
    },
    {
      title: "Phone",
      dataIndex: "contactPersonPhone",
      key: "contactPersonPhone",
      className: "capitalize",
    },
    {
      title: "Email",
      dataIndex: "contactPersonEmail",
      key: "contactPersonEmail",
    },
    {
      title: "Follow Up Date",
      dataIndex: "followUpDate",
      key: "followUpDate",
      className: "text-xs",
      render: (text: string) => <a>{formatDate(text)}</a>,
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

      const userRole: string = getUserRole()!;

      const response = await axios.get(`${URL}/api/leads?keyword`, { headers });
      const leadsData: ILeadsState[] = response.data;
      const filteredLeads = filterLeadsByLeadIds(leadsData, record);

      setLeads(filteredLeads);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          "An error occurred while fetching data.";
        console.error(errorMessage);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadsData();
  }, []);
  return (
    <main className="h-screen w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="max-h-[85%] h-[85%] relative w-[80%] bg-white  rounded-md  z-30 flex mb-10 xs:mb-0 justify-center py-10 overflow-y-auto">
        <CloseGrButton
          className="left-5"
          onClick={() => dispatch(closeMemberLeadsInfoModal())}
        />
        <div className="w-full h-auto  px-10 flex flex-col space-y-3 overflow-y-auto ">
          <h2 className="md:text-3xl text-xl  text-center font-semibold">
            Leads{" "}
            <span className="relative">
              Info
              <HorizontalBar />
            </span>
          </h2>

          <div className="">
            <div className="flex justify-between">
              <h2 className="capitalize font-semibold">
                Member Name:{" "}
                <span className="font-normal">{record.assignedTo}</span>
              </h2>
              <h2 className="capitalize font-semibold">
                Total Leads: <span className="font-normal">{record.count}</span>
              </h2>
            </div>
            <TableContainer
              columnsData={columns}
              rowsData={leads}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MemberLeadsInfoModal;
