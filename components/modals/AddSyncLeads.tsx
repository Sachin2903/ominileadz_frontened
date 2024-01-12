"use client";
import React, { useEffect, useState } from "react";
import { HorizontalBar, Loader } from "..";
import { closeAddSyncLeadsModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CloseGrButton from "../buttons/CloseGrButton";
import axios, { AxiosError } from "axios";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import toast from "react-hot-toast";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface IResponse {
  status: string;
  leads: number;
  skippedLeads: number;
}

const AddSyncLeadsModal = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<IResponse>();

  const handleClose = () => {
    dispatch(closeAddSyncLeadsModal());
    router.push("/leads");
  };

  const fetchSyncLeads = async () => {
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
      const response = await axios.post(
        `${URL}/api/source/sync?type=IMT`,
        null,
        {
          headers,
        }
      );

      setResponse(response.data);

      toast.success("Leads Updated...");
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

  return (
    <main className="h-screen w-full flex items-center justify-center z-[300] fixed bg-black bg-opacity-60">
      <div className="max-h-[85%] h-[60%] relative w-[80%] bg-white  rounded-md  z-30 flex justify-center items-center py-5 overflow-y-auto flex-col">
        <CloseGrButton onClick={handleClose} className="left-5" />
        <h2 className="md:text-3xl text-xl mb-7 text-center font-semibold">
          Synchronize{" "}
          <span className="relative">
            Leads
            <HorizontalBar />
          </span>
        </h2>
        <div className="w-full h-full md:px-36 lg:px-52 px-10  overflow-y-auto mt-5">
          <div className="flex justify-between items-center xs:text-base text-xs space-x-5">
            <p className="font-semibold">
              Do you want to add leads from Indian Mart ?
            </p>
            <button
              type="button"
              className={`capitalize px-5  py-1 tracking-wider rounded-md bg-[#4939FF] text-white self-start md:w-[30%] text-xs xs:text-sm ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#4939FF] hover:bg-blue-600"
              }`}
              onClick={fetchSyncLeads}
            >
              {isLoading ? <Loader /> : "Add"}
            </button>
          </div>
          {response && (
            <div className="mt-10 flex flex-col gap-y-5">
              <h2 className="font-semibold text-base">
                Status : {response.status}
              </h2>
              <h2 className="font-semibold text-base text-green-500 ">
                Total Leads : {response.leads}
              </h2>
              <h2 className="font-semibold text-base text-green-500 ">
                Skipped Leads : {response.skippedLeads}
              </h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AddSyncLeadsModal;
