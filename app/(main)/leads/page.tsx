"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import TableContainer from "@/components/TableContainer";
import { Layout, Loader2, SubMenu, SubMenuButtons } from "@/components";
import { useAppDispatch } from "@/redux/hooks";
import { openFeedbackModal } from "@/redux/features/modal/modalSlice";
import { ILeadsInitialState, ILeadsState } from "@/src/@types";
import { setLeadIdValue } from "@/redux/features/tasksId/taskIdSlice";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { getUserRole } from "@/src/utils/getUserRole";
import { useAppSelector } from "@/redux/store";
import { formatDate } from "@/src/utils/formatDate";
import { setLeadSubCategoryTextValue } from "@/redux/features/filterLeads/filterLeadsSlice";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
type SingleData = {
  data: ILeadsState[];
  dataCount: number;
  page: number;
  pageSize: number;
};
type MultiData = {
  data1: ILeadsState[];
  data1Count: number;
  data2: ILeadsState[];
  data2Count: number;
};
type LeadCategory =
  | "follow_up"
  | "send_details"
  | "quotation"
  | "new_leads"
  | "regretted"
  | "po";

interface Headings {
  heading1?: string;
  heading2?: string;
}

function getHeadings(leadCategory: LeadCategory): Headings {
  const headings: Headings = {};

  switch (leadCategory) {
    case "follow_up":
      headings.heading1 = "Today's Lead";
      headings.heading2 = "Others Leads";
      break;
    case "send_details":
      headings.heading1 = "Details Not Sent";
      headings.heading2 = "Details Sent";
      break;
    case "quotation":
      headings.heading1 = "Quotation Not Sent";
      headings.heading2 = "Quotation Sent";
      break;
    case "new_leads":
    case "regretted":
      // For these categories, we only set heading1
      headings.heading1 = leadCategory
        .replace(/_/g, " ")
        .replace(/\b(\w)/g, (s) => s.toUpperCase());

      break;
    case "po":
      // For these categories, we only set heading1
      headings.heading1 = "PO";

      break;
    default:
      headings.heading1 = "Unknown Category";
      break;
  }

  return headings;
}
const subItems = [
  {
    id: 0,
    title: "Add Leads Manually",
    path: "/leads/addLeads",
  },
  {
    id: 1,
    title: "Sync Leads",
    path: "/leads/syncLeads",
  },
];

const Page = () => {
  const [singleData, setSingleData] = useState<SingleData | null>(null);
  const [multiData, setMultiData] = useState<MultiData | null>(null);
  const [singleDataPagination, setSingleDataPagination] = useState({
    currentPage: 1,
    pageSize: 2,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const { leadCategory, leadSubCategory, leadSaveToggle } = useAppSelector(
    (state: { filterLeadsSlice: any }) => state.filterLeadsSlice
  );
  const dispatch = useAppDispatch();

  const handleSubMenuButtonClick = (value: string) => {
    dispatch(setLeadSubCategoryTextValue(value));
  };
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
      console.log("user Role", userRole);

      let params = {};

      if (["po", "regretted", "new_leads"].includes(leadSubCategory)) {
        params = {
          keyword: searchQuery,
          category: leadCategory,
          subCategory: leadSubCategory,
          page: singleDataPagination.currentPage,
          pageSize: singleDataPagination.pageSize,
        };
      } else {
        params = {
          keyword: searchQuery,
          category: leadCategory,
          subCategory: leadSubCategory,
        };
      }
      const response = await axios.get(`${URL}/api/leads`, {
        params,
        headers,
      });
      const leadsData = response.data;
      if (Object.keys(leadsData).length > 2) {
        setMultiData(leadsData);
      } else {
        setSingleData(leadsData);
        setSingleDataPagination({
          currentPage: leadsData.page,
          pageSize: leadsData.pageSize,
        });
      }


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
  let columns = [
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
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      className: "capitalize w-32 text-xs",
    },
    // {
    //   title: "Type",
    //   dataIndex: "leadType",
    //   key: "leadType",
    //   className: "capitalize w-20 text-xs",
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
      title: "Follow Up Date",
      dataIndex: "followUpDate",
      key: "followUpDate",
      className: "text-xs",
      render: (text: string) => <a>{formatDate(text)}</a>,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      className: "uppercase text-xs",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (text: string, record: ILeadsState) => (
        <button
          className="bg-[#0017F7] text-xs hover:bg-blue-500 text-white tracking-wider py-1 px-2 rounded"
          onClick={() => {
            dispatch(setLeadIdValue(record._id));
            dispatch(openFeedbackModal());
          }}
        >
          Details
        </button>
      ),
    },
  ];

  if (leadCategory === "follow_up" && leadSubCategory === "quotation_leads") {
    const leadDateColumnIndex = columns.findIndex(
      (column) => column.key === "leadDate"
    );
    const quotationColumn = {
      title: "Quotation",
      dataIndex: "quotationNumber",
      key: "quotationNumber",
      className: "text-xs",
      // Add any additional rendering logic if needed
    };

    // Insert "Quotation" column after "Lead Date" column
    columns.splice(leadDateColumnIndex + 1, 0, quotationColumn);
  }
  if (leadCategory === "new_leads") {
    columns = columns.filter((column) => column.key !== "followUpDate");
  }

  useEffect(() => {
    fetchLeadsData();
  }, [searchQuery, leadCategory, leadSubCategory, leadSaveToggle]);

  console.log("log from page", leadSaveToggle);

  const subMenuButtonItems = [
    {
      id: 0,
      title: "all leads",
      value: "all_leads",
    },
    {
      id: 1,
      title: "other leads",
      value: "other_leads",
    },
    {
      id: 2,
      title: "quotation leads",
      value: "quotation_leads",
    },
  ];
  // console.log("leadCategory", leadCategory, "leadSubcategory", leadSubCategory);

  const handleTableChange = (pagination: {
    current: number;
    pageSize: number;
  }): void => {
    {
      singleData &&
        setSingleDataPagination({
          currentPage: singleData?.page,
          pageSize: singleData?.pageSize,
        });
      fetchLeadsData();
    }
  };
  
  return isLoading ? (
    <div className="py-5">
      <Loader2 />
    </div>
  ) : (
    <>
      {leadCategory === "new_leads" && <SubMenu data={subItems} />}
      {leadCategory === "follow_up" && (
        <SubMenuButtons
          data={subMenuButtonItems}
          activeFilter={leadSubCategory}
          onSelect={handleSubMenuButtonClick}
        />
      )}
      {singleData &&
        ["new_leads", "regretted", "po"].includes(leadCategory) && (
          <main>
            <h2 className="text-xl font-semibold tracking-wider mt-5">
              {getHeadings(leadCategory).heading1} ({singleData.dataCount})
            </h2>
            {singleData.data.length > 0 ? (
              <TableContainer
                columnsData={columns}
                rowsData={singleData.data}
                pagination={{
                  pageSize: 10,
                  onChange: handleTableChange,
                }}
                currentPage={singleDataPagination.currentPage}
                totalItems={singleData.dataCount}
              />
            ) : (
              <h2 className=" text-xs my-5 ml-5 font-semibold text-gray-500 tracking-wide">
                No Data
              </h2>
            )}
          </main>
        )}

      {multiData &&
        ["follow_up", "send_details", "quotation"].includes(leadCategory) && (
          <main>
            <h2 className="text-xl font-semibold tracking-wider mt-5">
              {getHeadings(leadCategory).heading1} ({multiData.data1Count})
            </h2>
            {multiData.data1.length > 0 ? (
              <TableContainer
                columnsData={columns}
                rowsData={multiData.data1}
                pagination={{
                  pageSize: 10,
                  onChange: handleTableChange,
                }} currentPage={1} totalItems={multiData.data1Count}              />
            ) : (
              <h2 className=" text-xs my-5 ml-5 font-semibold text-gray-500 tracking-wide">
                No Data
              </h2>
            )}



            <h2 className="text-xl font-semibold tracking-wider mt-5">
              {getHeadings(leadCategory).heading2} ({multiData.data2Count})
            </h2>
            {multiData.data2.length > 0 ? (
              <TableContainer
                columnsData={columns}
                rowsData={multiData.data2}
                pagination={{
                  pageSize: 10,
                  onChange: handleTableChange,
                }}
                 currentPage={1} totalItems={multiData.data2Count}              />
            ) : (
              <h2 className=" text-xs my-5 ml-5 font-semibold text-gray-500 tracking-wide">
                No Data
              </h2>
            )}



          </main>
        )} 
    </>
  );
};

export default Page;
