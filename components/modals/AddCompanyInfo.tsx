import { closeAddCompanyInfoModal } from "@/redux/features/modal/modalSlice";
import { IBusinessType, ICompanyObject } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { HorizontalBar, FormRow, FormRowSelect } from "..";
import CloseGrButton from "../buttons/CloseGrButton";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

const initialValue: ICompanyObject = {
  name: "",
  industry: "",
  aboutUs: "",
  owner: 0,
  size: "",
  address: "",
  website: "",
  type: "Prospect",
  country: "",
  city: "",
  state: "",
  postalCode: "",
  annualRevenue: "",
  moneyRaised: "",
  sources: [
    { type: "", source: "", asOn: 0 },
    { type: "", source: "", asOn: 0 },
  ],
  description: "",
  linkedInPage: "",
  parentCompany: 0,
  childCompanies: [1, 3, 4, 5],
  ownership: "public",
  lifecycleStage: "Subscriber",
  contactPersons: [1, 3, 4],
  incorporationDate: "",
  social: [
    { type: "website", link: "", impact: "", bio: "" },
    { type: "facebook", link: "", impact: "", bio: "" },
    { type: "twitter", link: "", impact: "", bio: "" },
    { type: "whatsapp", link: "", impact: "", bio: "" },
  ],
};
const AddCompanyInfo = () => {
  const dispatch = useDispatch();
  const [companyData, setCompanyData] = useState<ICompanyObject>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "postalCode" && value.length > 6) {
      toast.error("Maximum limit exceeded in Postalcode");
      setCompanyData((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    } else {
      setCompanyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.post(`${URL}/api/company`, companyData, {
        headers,
      });

      toast.success("Company Info added...");
      window.location.reload();
      dispatch(closeAddCompanyInfoModal());
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

  return (
    <main className="h-full w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="h-auto lg:w-[90%] w-[80%] bg-white  rounded-md  py-5 z-30 flex flex-col relative items-center ">
        <h2 className="md:text-3xl text-xl sm:mb-10 text-center font-semibold ">
          Add Company{" "}
          <span className="relative">
            Information
            <HorizontalBar />
          </span>
        </h2>
        <CloseGrButton
          onClick={() => dispatch(closeAddCompanyInfoModal())}
          className="left-5"
        />
        <form
          className="grid grid-cols-2 h-[70%] md:gap-x-10 lg:w-[80%] w-[75%] gap-x-3 items-center gap-y-3"
          onSubmit={handleSubmit}
        >
          <FormRow
            type="text"
            name="name"
            value={companyData.name}
            labelText="name"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="industry"
            value={companyData.industry}
            labelText="Industry"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="aboutUs"
            value={companyData.aboutUs}
            labelText="About Us"
            handleChange={handleChange}
          />
          <FormRow
            type="date"
            name="incorporationDate"
            value={companyData.incorporationDate}
            labelText="Incorporation Date"
            handleChange={handleChange}
          />

          <FormRowSelect
            name="type"
            value={companyData.type}
            labelText="Type"
            handleOptionChange={handleOptionChange}
            list={["Prospect", "Partner", "Reseller", "Vendor", "Other"]}
          />
          <div className="grid grid-cols-2 row-span-1 gap-x-3">
            <FormRow
              type="text"
              name="city"
              value={companyData.city}
              labelText="City"
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="state"
              value={companyData.state}
              labelText="State"
              handleChange={handleChange}
            />
          </div>
          <FormRow
            type="text"
            name="address"
            value={companyData.address}
            labelText="Address"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="description"
            value={companyData.description}
            labelText="Description"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="ownership"
            value={companyData.ownership}
            labelText="Ownership"
            handleOptionChange={handleOptionChange}
            list={["public", "private"]}
          />
          <FormRowSelect
            name="lifecycleStage"
            value={companyData.lifecycleStage}
            labelText="Lifecycle Stage"
            handleOptionChange={handleOptionChange}
            list={[
              "Subscriber",
              "Lead",
              "Marketing Qualified Lead",
              "Opportunity",
              "Customer",
              "Evangelist",
              "Other",
            ]}
          />
          <FormRow
            type="number"
            name="postalCode"
            value={companyData.postalCode}
            labelText="Postal Code"
            handleChange={handleChange}
          />
          <FormRow
            type="number"
            name="annualRevenue"
            value={companyData.annualRevenue}
            labelText="Annual Revenue"
            handleChange={handleChange}
          />

          <div className="col-span-2 flex items-center justify-evenly md:px-20 px-0 md:gap-x-8 gap-x-3 sm:py-3 py-3">
            <button
              type="submit"
              className="bg-[#7F56D9] md:w-1/2 w-full rounded-md sm:py-2.5 py-1  text-white"
            >
              Add
            </button>
            <button
              type="button"
              className="-outline-offset-2 outline outline-slate-400 outline-2  md:w-1/2 w-full  text-slate-600 rounded-md sm:py-2.5 py-1 xl:mt-auto"
              onClick={() => setCompanyData(initialValue)}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddCompanyInfo;
