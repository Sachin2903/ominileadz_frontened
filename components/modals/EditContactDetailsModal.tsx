import { closeEditContactDetailsModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IContact } from "@/src/@types";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HorizontalBar, FormRow, FormRowSelect } from "..";
import CloseGrButton from "../buttons/CloseGrButton";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;

interface contactDetailsProps {
  contactId: string;
}
const initialContact = {
  fullName: "",
  email: "",
  industry: "",
  jobtitle: "",
  phone: "",
  address: "",
  pincode: "",
  country: "",
  city: "",
  company: "",
  gender: "male",
  title: "",
  leadStatus: "new",
  prefLanguage: "",
  workEmail: "",
  source: "organic search",
};
const EditContactDetailsModal: React.FC<contactDetailsProps> = ({
  contactId,
}) => {
  const [contact, setContact] = useState<IContact>(initialContact);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "phone" && value.length > 10) {
      toast.error("Maximum limit exceeded in Phone");
      setContact((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    } else if (name === "pincode" && value.length > 10) {
      toast.error("Maximum limit exceeded in Phone");
      setContact((prevData) => ({
        ...prevData,
        [name]: "",
      }));
    } else {
      setContact((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prevData) => ({
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

      const response = await axios.patch(
        `${URL}/api/contacts/${contactId}`,
        contact,
        { headers }
      );
      toast.success("Details Updated...");
      window.location.reload();
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

  const fetchLeadsData = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/contacts/${contactId}`, {
        headers,
      });
      const contacts: IContact = response.data;
      setContact(contacts);
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
    fetchLeadsData();
  }, []);

  return (
    <main className="h-full w-full flex items-center justify-center z-20 fixed bg-black bg-opacity-60">
      <div className="xs:h-[90vh] h-[80vh] overflow-auto lg:w-[90%] w-[80%] bg-white  rounded-md  py-5 z-30 flex flex-col relative items-center mb-20 xs:mb-0">
        <h2 className="md:text-3xl text-xl mb-10 text-center font-semibold ">
          Edit Contact{" "}
          <span className="relative">
            Details
            <HorizontalBar />
          </span>
        </h2>
        <CloseGrButton
          onClick={() => dispatch(closeEditContactDetailsModal())}
          className="left-5"
        />
        {contact && (
          <form
            className="grid grid-cols-2 h-[70%] md:gap-x-10 lg:w-[80%] w-[75%] gap-x-3 items-center gap-y-3"
            onSubmit={handleSubmit}
          >
            <FormRow
              type="text"
              name="fullName"
              value={contact.fullName}
              labelText="Full Name"
              handleChange={handleChange}
            />
            <FormRow
              type="email"
              name="email"
              value={contact.email}
              labelText="Email"
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="industry"
              value={contact.industry}
              labelText="Industry"
              handleChange={handleChange}
            />
            <FormRow
              type="number"
              name="phone"
              value={contact.phone}
              labelText="Phone"
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="address"
              value={contact.address}
              labelText="Address"
              handleChange={handleChange}
            />
            <div className="grid grid-cols-2 row-span-1 gap-x-3">
              <FormRow
                type="text"
                name="city"
                value={contact.city}
                labelText="City"
                handleChange={handleChange}
              />
              <FormRow
                type="number"
                name="pincode"
                value={contact.pincode}
                labelText="Pincode"
                handleChange={handleChange}
              />
            </div>

            <FormRow
              type="text"
              name="country"
              value={contact.country}
              labelText="Country"
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="company"
              value={contact.company}
              labelText="Company"
              handleChange={handleChange}
            />
            <FormRowSelect
              name="gender"
              value={contact.gender}
              labelText="Gender"
              handleOptionChange={handleOptionChange}
              list={["male", "female", "other"]}
            />
            {/* <FormRow
            type="date"
            name="birthDate"
            value={contact.birthDate}
            labelText="Birth Date"
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="degree"
            value={contact.degree}
            labelText="Degree"
            handleChange={handleChange}
          /> */}
            <FormRow
              type="text"
              name="title"
              value={contact.title}
              labelText="Role"
              handleChange={handleChange}
            />
            {/* <FormRowSelect
            name="lifecycleStage"
            value={contact.lifecycleStage}
            labelText="Lifecycle Stage"
            handleOptionChange={handleOptionChange}
            list={[
              "subscriber",
              "lead",
              "marketing quilified lead",
              "opportunity",
              "customer",
              "evangelist",
              "other",
            ]}
          /> */}
            <FormRowSelect
              name="leadStatus"
              value={contact.leadStatus}
              labelText="Lead Status"
              handleOptionChange={handleOptionChange}
              list={[
                "new",
                "open",
                "in progress",
                "open deal",
                "unqualified",
                "attempted to contact",
                "connect",
                "bad timing",
              ]}
            />
            <FormRow
              type="text"
              name="prefLanguage"
              value={contact.prefLanguage}
              labelText="Pref Language"
              handleChange={handleChange}
            />
            {/* <FormRowSelect
            name="maritalStatus"
            value={contact.maritalStatus}
            labelText="Marital Status"
            handleOptionChange={handleOptionChange}
            list={["married", "un-married"]}
          /> */}
            <FormRow
              type="email"
              name="workEmail"
              value={contact.workEmail}
              labelText="Work Email"
              handleChange={handleChange}
            />
            <FormRowSelect
              name="source"
              value={contact.source}
              labelText="Contact Source"
              handleOptionChange={handleOptionChange}
              list={[
                "organic search",
                "paid search",
                "email marketing",
                "organic social",
                "referral",
                "other campaigns",
                "direct traffic",
                "offline sources",
                "paid social",
              ]}
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
                onClick={() => dispatch(closeEditContactDetailsModal())}
              >
                cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default EditContactDetailsModal;
