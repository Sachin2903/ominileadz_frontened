"use client";
import React, { useState } from "react";
import { FormRow, FormRowSelect, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import { closeAddLeadsManuallyModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CloseGrButton from "../buttons/CloseGrButton";
import toast, { Toaster } from "react-hot-toast";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import { ILeadsInitialState, ILeadsState } from "@/src/@types";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

// for post member
const iAddLeads = {
  leadId: "",
  leadType: "a",
  contactPersonName: "",
  contactPersonEmail: "",
  contactPersonPhone: "",
  subject: "",
  companyName: "",
  companyAddress: "",
  city: "",
  state: "",
  pincode: "",
  country_iso: "",
  contactPersonPhoneAlt: "",
  contactPersonEmailAlt: "",
  productName: "",
  description: "",
  lead_mcat_name: "",
  callDuration: "",
  receiverMobile: "",
  source: "manual",

  // old keys
  stage: "",
  followUpDate: "",
  assignedTo: "",
  status: "",
  quotationNumber: "",
  detailsSent: false,
};

const AddLeadsManually = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [addLeadsManually, setAddLeadsManually] = useState(iAddLeads);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "pincode" && value.length > 6) {
      toast.error("Maximum limit exceeded in Pincode");
      setAddLeadsManually({ ...addLeadsManually, [name]: "" });
    } else if (name === "contactPersonPhone" && value.length > 10) {
      toast.error("Maximum limit exceeded in Phone");
      setAddLeadsManually({ ...addLeadsManually, [name]: "" });
    } else {
      setAddLeadsManually({ ...addLeadsManually, [name]: value });
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddLeadsManually({ ...addLeadsManually, [name]: value });
  };

  const handleSubmit = async (e: any) => {
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

      const response = await axios.post(`${URL}/api/leads`, addLeadsManually, {
        headers,
      });
      toast.success("Lead created successfully...");
      setAddLeadsManually(iAddLeads);
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

  const handleClose = () => {
    dispatch(closeAddLeadsManuallyModal());
    router.push("/leads");
  };

  return (
    <main className="h-full w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60 s ">
      <div className="sm:h-auto max-h-[80vh] xs:max-h-[95vh]  sm:w-[90%] w-[95%]  bg-white  rounded-md z-30 flex relative flex-col xs:px-16 py-2  mb-20 sm:mb-0 overflow-auto mt-10 xs:mt-0">
        <CloseGrButton onClick={handleClose} className="left-5" />
        <h2 className="md:text-2xl text-lg mb-7 text-center font-semibold">
          Add Leads{" "}
          <span className="relative">
            Manually
            <HorizontalBar />
          </span>
        </h2>
        <form
          className=" grid xs:grid-cols-2 grid-cols-1 lg:gap-x-10 gap-x-3 gap-y-3 self-center sm:w-[90%] md:w-[90%] lg:w-[70%]"
          onSubmit={handleSubmit}
        >
          {/* <FormRow
            type="text"
            name="leadId"
            value={addLeadsManually.leadId}
            labelText="Lead Id"
            handleChange={handleChange}
          /> */}
          <FormRow
            type="text"
            name="companyName"
            value={addLeadsManually.companyName}
            labelText="Company Name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="subject"
            value={addLeadsManually.subject}
            labelText="Title"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="leadType"
            value={addLeadsManually.leadType}
            labelText="Lead Type"
            handleOptionChange={handleOptionChange}
            list={["a", "b", "c", "d"]}
          />

          <FormRow
            type="text"
            name="productName"
            value={addLeadsManually.productName}
            labelText="Product Name"
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="contactPersonName"
            value={addLeadsManually.contactPersonName}
            labelText="Contact Person Name"
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="contactPersonEmail"
            value={addLeadsManually.contactPersonEmail}
            labelText="Contact Person Email"
            handleChange={handleChange}
          />

          <FormRow
            type="number"
            name="contactPersonPhone"
            value={addLeadsManually.contactPersonPhone}
            labelText="Contact Person Phone"
            handleChange={handleChange}
          />
          {/* <FormRow
            type="date"
            name="leadDate"
            value={addLeadsManually.leadDate}
            labelText="Lead Date"
            handleChange={handleChange}
          /> */}

          <div className="grid grid-cols-2 row-span-1 gap-x-3">
            <FormRow
              type="text"
              name="city"
              value={addLeadsManually.city}
              labelText="City"
              handleChange={handleChange}
            />
            <FormRow
              type="number"
              name="pincode"
              value={addLeadsManually.pincode}
              labelText="Pincode"
              handleChange={handleChange}
            />
          </div>
          <FormRowSelect
            name="stage"
            value={addLeadsManually.stage}
            labelText="Lead Quality"
            handleOptionChange={handleOptionChange}
            list={["1", "2", "3", "4", "5"]}
          />
          <FormRow
            type="text"
            name="description"
            value={addLeadsManually.description}
            labelText="Description"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="companyAddress"
            value={addLeadsManually.companyAddress}
            labelText="Company Address"
            handleChange={handleChange}
          />

          <FormRowSelect
            name="source"
            value={addLeadsManually.source}
            labelText="Source"
            handleOptionChange={handleOptionChange}
            list={["manual", "wtsp", "IMT", "mail", "other"]}
          />
          <div className="xs:col-span-2 col-span-1 flex items-center justify-evenly md:px-20 px-0 md:gap-x-8 gap-x-2 sm:py-3 py-5 text-xs sm:text-base ">
            <button
              type="submit"
              className="bg-[#7F56D9] md:w-1/2 w-full rounded-md sm:py-2 py-1  text-white "
            >
              Add Leads
            </button>
            <button
              type="button"
              className="-outline-offset-2 outline outline-slate-400 text-slate-600 outline-2  md:w-1/2 w-full rounded-md sm:py-2 py-1  "
              onClick={() => setAddLeadsManually(iAddLeads)}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddLeadsManually;
