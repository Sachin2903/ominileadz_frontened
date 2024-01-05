"use client";
import { FormRow, FormRowSelect, Layout, Loader2, SubMenu } from "@/components";
import axios, { AxiosError } from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
import { Space, Table, Tag } from "antd";
import TableContainer from "@/components/TableContainer";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { useAppSelector } from "@/redux/store";

interface RenderProps {
  tags: string[]; // Assuming tags is an array of strings
}
interface ILeadsSource {
  name: string;
  code: string;
  status: string;
  type: string;
}

const initialState: ILeadsSource = {
  name: "",
  code: "",
  status: "active",
  type: "a",
};

const Page: React.FC = () => {
  const [values, setValues] = useState(initialState);
  const [leadSources, setLeadSources] = useState<ILeadsSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        // Handle the case where the tokens are missing or invalid
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.post(`${URL}/api/source`, values, {
        headers,
      });
      window.location.reload();
      setValues(initialState);
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

  const fetchLeadsSources = async () => {
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
        `${URL}/api/source?keyword=${searchQuery}`,
        { headers }
      );
      const sourcesArr = response.data;
      setLeadSources(sourcesArr);
      setIsLoading(false);
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
        const name = record.name;
        const initials = name
          .split(" ")
          .map((word: string) => word.charAt(0))
          .join("");

        return <a className="uppercase">{initials}</a>;
      },
    },
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      className: "text-xs",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      className: "text-xs",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      className: "capitalize text-xs",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        let color = status.toUpperCase() === "ACTIVE" ? "green" : "red";
        return (
          <Tag color={color} className="text-xs">
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const pagination = {
    pageSize: 3,
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

  // ## try useEffect with some laoder component
  useEffect(() => {
    fetchLeadsSources();
  }, [searchQuery]);

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        <div className="flex items-center justify-center pt-6 py-3 text-2xl font-semibold">
          <h2>Leads Source</h2>
        </div>
        <form
          className="grid md:grid-cols-2 grid-cols-1 md:gap-x-16  items-center  md:px-10 px-5 gap-y-2"
          onSubmit={handleSubmit}
        >
          <FormRow
            type="text"
            name="name"
            value={values.name}
            labelText="Name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="code"
            value={values.code}
            labelText="Code"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="status"
            value={values.status}
            labelText="Status"
            handleOptionChange={handleOptionChange}
            list={["active", "non-active"]}
          />
          <FormRowSelect
            name="type"
            value={values.type}
            labelText="Type"
            handleOptionChange={handleOptionChange}
            list={["a", "b", "c", "d", "e"]}
          />

          <div className="md:col-span-2 text-xs col-span-1 flex items-center justify-evenly md:px-20 px-0 md:gap-x-8 gap-x-3 pt-7">
            <button
              type="submit"
              className="bg-[#7F56D9] md:w-1/2 w-full rounded-md py-2  text-white "
            >
              Add Source
            </button>
            <button
              type="button"
              className="bg-[#7F56D9] md:w-1/2 w-full rounded-md py-2  text-white "
              onClick={() => setValues(initialState)}
            >
              Clear
            </button>
          </div>
        </form>
        {isLoading ? (
          <div className="py-10">
            <Loader2 />
          </div>
        ) : (
          <TableContainer
            columnsData={columns}
            rowsData={leadSources}
            pagination={pagination}
          />
        )}
      </main>
    </>
  );
};

export default Page;
