"use client";
import React, { useEffect, useState } from "react";
import { FormRow, FormRowSelect, FormTextArea, HorizontalBar } from "..";
import axios, { AxiosError } from "axios";
import { closeUpdateBusinessDetailsModal } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import CloseGrButton from "../buttons/CloseGrButton";
import { IBusinessType } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import toast from "react-hot-toast";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface UpdateBusinessDetailsModalProps {
  businessId: string;
}

const initialValue: IBusinessType = {
  _id: "",
  lat: 0,
  long: 0,
  isPrimary: false,
  category: 0,
  brand: 0,
  pincode: "",
  name: "",
  code: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  description: "",
  cash: false,
  upi: false,
  card: false,
  businessType: "",
  paymentType: "",
  printLogo: "",
  adminLogo: "",
  adminSmallLogo: "",
  appLogo: "",
  favicon: "",
  footerText: "",
  gtmCode: "",
  smsSenderId: 0,
  emailFrom: "",
  paymentGatewayConfig: 0,
};
const UpdateBusinessDetailsModal: React.FC<UpdateBusinessDetailsModalProps> = ({
  businessId,
}) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState<IBusinessType>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "pincode" && value.length > 6) {
      toast.error("Maximum limit exceeded in Pincode");
      setDetails({ ...details, [name]: "" });
    } else if (name === "phone" && value.length > 10) {
      toast.error("Maximum limit exceeded in Phone");
      setDetails({ ...details, [name]: "" });
    } else {
      setDetails({ ...details, [name]: value });
    }
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
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

      const response = await axios.patch(
        `${URL}/api/business/details/${businessId}`,
        details,
        { headers }
      );
      toast.success("Details Updated...");
      window.location.reload();
      dispatch(closeUpdateBusinessDetailsModal());
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

  const fetchBusinessDetails = async () => {
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
        `${URL}/api/business/details/${businessId}`,
        {
          headers,
        }
      );
      const details: IBusinessType = response.data;
      setDetails(details);
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
    fetchBusinessDetails();
  }, []);

  return (
    <main className="h-full w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="h-auto lg:w-[90%] w-[80%] bg-white  rounded-md  py-5 z-30 flex flex-col relative items-center ">
        <h2 className="md:text-3xl text-xl sm:mb-10 text-center font-semibold ">
          Update Business{" "}
          <span className="relative">
            Details
            <HorizontalBar />
          </span>
        </h2>
        <CloseGrButton
          onClick={() => dispatch(closeUpdateBusinessDetailsModal())}
          className="left-5"
        />
        <form
          className="grid grid-cols-2 h-[70%] md:gap-x-10 lg:w-[80%] w-[75%] gap-x-3 items-center gap-y-3"
          onSubmit={handleSubmit}
        >
          <FormRow
            type="text"
            name="name"
            value={details.name}
            labelText="name"
            handleChange={handleChange}
          />
          <FormRow
            type="number"
            name="phone"
            value={details.phone}
            labelText="Phone Number"
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={details.email}
            labelText="email"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="category"
            value={details.category}
            labelText="Category"
            handleChange={handleChange}
          />

          <FormRowSelect
            name="businessType"
            value={details.businessType}
            labelText="Business Type"
            handleOptionChange={handleOptionChange}
            list={["Producer", "Retailer", "Wholesaler", "Trader"]}
          />
          <div className="grid grid-cols-2 row-span-1 gap-x-3">
            <FormRow
              type="text"
              name="address"
              value={details.address}
              labelText="Address"
              handleChange={handleChange}
            />
            <FormRow
              type="number"
              name="pincode"
              value={details.pincode}
              labelText="Pincode"
              handleChange={handleChange}
            />
          </div>
          <FormRow
            type="text"
            name="description"
            value={details.description}
            labelText="Description"
            handleChange={handleChange}
          />
          <FormRowSelect
            name="paymentType"
            value={details.paymentType}
            labelText="Payment Type"
            handleOptionChange={handleOptionChange}
            list={["Card", "Upi", "Cash"]}
          />
          <FormRow
            type="text"
            name="gtmCode"
            value={details.gtmCode}
            labelText="GTM Code"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="website"
            value={details.website}
            labelText="Website"
            handleChange={handleChange}
          />

          <div className="col-span-2 flex items-center justify-evenly md:px-20 px-0 md:gap-x-8 gap-x-3 sm:py-3 py-3">
            <button
              type="submit"
              className="bg-[#7F56D9] md:w-1/2 w-full rounded-md sm:py-2.5 py-1  text-white"
            >
              Update
            </button>
            <button
              type="button"
              className="-outline-offset-2 outline outline-slate-400 outline-2  md:w-1/2 w-full  text-slate-600 rounded-md sm:py-2.5 py-1 xl:mt-auto"
              onClick={() => setDetails(initialValue)}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateBusinessDetailsModal;
