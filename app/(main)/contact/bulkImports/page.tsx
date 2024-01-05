"use client";
import { Layout, SubMenu } from "@/components";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button, message } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const uploadProps: any = {
  name: "file",
  action: `${URL}/api/upload-csv`,
  listType: "picture",
  beforeUpload: (file: File) => {
    if (file.type !== "application/vnd.ms-excel" && file.type !== "text/csv") {
      message.error("You can only upload CSV files!");
      return false;
    }
    return true;
  },
  customRequest: ({
    file,
    onSuccess,
    onError,
  }: {
    file: File;
    onSuccess: (response: any, file: File) => void;
    onError: (error: Error) => void;
  }) => {
    // Custom request to handle CSV file upload
    const formData = new FormData();
    formData.append("file", file);

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
      onError(
        new Error("Access token or refresh token is missing or invalid.")
      );
      return;
    }

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .post(`${URL}/api/upload-csv`, formData, {
        headers: headers,
      })
      .then((response: AxiosResponse) => {
        onSuccess(response.data, file);
        toast.success("File uploaded...");
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        onError(error);
      });
  },
};

const Page: React.FC = () => {
  const [downloadError, setDownloadError] = useState<boolean>(false);

  const handleDownload = async () => {
    try {
      setDownloadError(false);
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response: AxiosResponse<Blob> = await axios.get(
        `${URL}/api/download-csv`,
        {
          responseType: "blob",
          headers: headers,
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "sample.csv";
        a.click();

        window.URL.revokeObjectURL(url);
      } else {
        setDownloadError(true);
      }
    } catch (error) {
      console.error("Error downloading CSV file:", error);
      setDownloadError(true);
    }
  };
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

  return (
    <>
      <SubMenu data={subMenuData} />
      <main>
        <div className="py-5 md:px-0 px-3">
          <h2 className="font-semibold text-gray-700 ">
            Import your existing Leads contacts through CSV file
          </h2>
          <p className="my-5 text-xs font-sans ">
            (Supports only CSV file with comma-separated values)
          </p>

          <div className="flex items-center">
            <button
              onClick={handleDownload}
              className="flex flex-col items-center gap-y-2  hover:text-white hover:bg-[#0017F7] cursor-pointer text-[#0017F7] text-xs border-[0.5px] p-[0.4rem] rounded border-[#0017F7] transition-all duration-300"
            >
              Download Sample CSV
            </button>
            {downloadError && (
              <p className="text-red-500 ml-3 text-xs">
                Failed to download CSV file.
              </p>
            )}
          </div>
          <hr className="my-5" />
          <Upload {...uploadProps}>
            <Button
              icon={<UploadOutlined />}
              className="rounded text-xs cursor-pointer text-[#0017F7]  border-[0.5px]  border-[#0017F7] transition-all duration-300"
            >
              Upload CSV
            </Button>
          </Upload>
        </div>
      </main>
    </>
  );
};

export default Page;
