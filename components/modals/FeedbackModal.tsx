"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeFeedbackModal } from "@/redux/features/modal/modalSlice";
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import CloseGrButton from "../buttons/CloseGrButton";
import { AiOutlineEye, AiOutlineBars } from "react-icons/ai";
import {
  IComment,
  ICommentObject,
  ICompanyObject,
  ILeadsInitialState,
  ILeadsState,
  IUserObject,
  TeamMembersType,
} from "@/src/@types";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import axios, { AxiosError } from "axios";
import { getAccessToken, getRefreshToken } from "@/src/utils/getTokens";
import FormRow from "../FormRow";
import { FormRowSelect, Loader2 } from "..";
const URL: string = process.env.NEXT_PUBLIC_BASE_URL!;
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import toast from "react-hot-toast";
import { Popconfirm, Select } from "antd";
import { getUser, getUserRole } from "@/src/utils/getUserRole";
import { formatDateFunction } from "@/src/utils/formatDateFunction";
import { FcAbout } from "react-icons/fc";
import { formatDate } from "@/src/utils/formatDate";
import { setLeadSaveToggleValue } from "@/redux/features/filterLeads/filterLeadsSlice";
interface FeedbackModalProps {
  leadId: string;
}
interface Option {
  value: string;
  label: string;
}

let initialCommentObject = {
  leadId: "",
  comments: [
    {
      date: "",
      name: "",
      text: "",
    },
  ],
};

const iAddLeads: ILeadsInitialState = {
  leadId: "",
  leadType: "",
  leadDate: "",
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
  status: "details not sent",
  quotationNumber: "",
  detailsSent: false,
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({ leadId }) => {
  const [lead, setLead] = useState<ILeadsInitialState>(iAddLeads);
  const [members, setMembers] = useState<Option[]>([]);
  const textAreaRef = useRef(null);
  const dispatch = useAppDispatch();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [comment, setComment] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [commentsObject, setCommentsObject] = useState<IComment[]>();

  const [userDetails, setUserDetails] = useState<IUserObject | null>();

  // pop confirm hooks
  const [openSavePopConfirm, setOpenSavePopConfirm] = useState<boolean>(false);
  const [openClosePopConfirm, setOpenClosePopConfirm] =
    useState<boolean>(false);
  const [popConfirmTitle, setPopConfirmTitle] = useState("");
  const [popConfirmDescription, setPopConfirmDescription] = useState("");

  const { leadSaveToggle } = useAppSelector(
    (state: { filterLeadsSlice: any }) => state.filterLeadsSlice
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "contactPersonPhone" && value.length > 10) {
      toast.error("Maximum limit exceeded in Phone");
      setLead((prevLead) => ({
        ...prevLead,
        [name]: "",
      }));
    } else if (name === "pincode" && value.length > 6) {
      toast.error("Maximum limit exceeded in Pincode");
      setLead((prevLead) => ({
        ...prevLead,
        [name]: "",
      }));
    } else {
      setLead((prevLead) => ({
        ...prevLead,
        [name]: value,
      }));
    }
    console.log(lead);
    dispatch(setLeadSaveToggleValue(true));
  };

  const handleMember = (value: string) => {
    setSelectedMember(value);
    setLead((prevLead) => ({
      ...prevLead,
      assignedTo: value,
    }));

    dispatch(setLeadSaveToggleValue(true));
  };
  const handleStarClick = (index: number) => {
    setLead((prevLead) => ({
      ...prevLead,
      stage: String(index + 1),
    }));
    dispatch(setLeadSaveToggleValue(true));
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setLead((prevLead) => ({
      ...prevLead,
      [name]: value,
    }));
    console.log(lead);
    console.log("check 1");

    dispatch(setLeadSaveToggleValue(true));
    console.log("check 2");
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

      const response = await axios.patch(`${URL}/api/leads/${leadId}`, lead, {
        headers,
      });
      if (leadSaveToggle) {
        toast.success("Lead Updated...");
        dispatch(setLeadSaveToggleValue(false));
      } else {
        toast.success("Nothing changed...");
      }
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

  const fetchTeamMembers = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/business/team?keyword`, {
        headers,
      });

      const teamsData: TeamMembersType[] = response.data;

      const filteredData: Option[] = teamsData.map((team) => ({
        value: team.name,
        label: team.name,
      }));

      setMembers(filteredData);
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

  const handleComment = async (e: any) => {
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

      const updatedObject = {
        leadId: leadId,
        text: comment,
      };

      const response = await axios.post(`${URL}/api/comments`, updatedObject, {
        headers,
      });
      setComment("");
      toast.success("Comment Added...");
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

      const user: IUserObject | null = getUser();
      if (user) setUserDetails(user);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/leads/${leadId}`, {
        headers,
      });
      const leadData: ILeadsInitialState = response.data;
      setSelectedMember(leadData.assignedTo);
      setLead(leadData);
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

  const fetchCommentsData = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token is missing or invalid.");
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.get(`${URL}/api/comments?leadId=${leadId}`, {
        headers,
      });
      const responseData = response?.data;
      const data: IComment[] | [] = responseData && responseData[0]?.comments;

      if (Array.isArray(data) && data.length > 0) {
        data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setCommentsObject(data);
      }
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

  const handleSaveConfirmation = () => {
    setPopConfirmTitle("Some changes made");
    setPopConfirmDescription("Do you want to change Follow up date?");
    setOpenSavePopConfirm(true);
  };

  const handleCloseConfirmation = () => {
    setPopConfirmTitle("Some changes made");
    setPopConfirmDescription("Do you want to keep the changes");
    setOpenClosePopConfirm(true);
  };

  useEffect(() => {
    setLoading(true);
    fetchTeamMembers();
    fetchLeadsData();
    fetchCommentsData();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCommentsData();
  }, [comment]);

  useEffect(() => {
    if (textAreaRef.current) {
      const { style, scrollHeight } =
        textAreaRef.current as HTMLTextAreaElement;
      if (style) {
        style.height = "auto";
        style.height = scrollHeight + "px";
      }
    }
  }, [lead?.description]);

  console.log("log from modal", leadSaveToggle);

  return (
    <form
      className="h-full w-full flex xs:items-center items-start justify-center  z-20 fixed bg-black bg-opacity-60"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <div className="relative h-[82vh] xs:h-[94vh]  lg:w-[90%] w-[80%] bg-white  rounded-md pt-14 pb-5 xs:py-5 z-30  mt-10 xs:mt-0 flex items-center justify-center">
          <Loader2 />
        </div>
      ) : (
        <div className="relative max-h-[82vh] xs:max-h-[95vh]  lg:w-[90%] w-[80%] bg-white  rounded-md pt-14 pb-5 xs:py-5 z-30 lg:grid lg:grid-cols-12 lg:gap-x-16 xs:px-16 px-5 xl:px-20 overflow-auto mt-10 xs:mt-0">
          <Popconfirm
            placement="topRight"
            title={popConfirmTitle}
            description={popConfirmDescription}
            open={openClosePopConfirm}
            onConfirm={(e) => {
              if (leadSaveToggle) {
                handleSubmit(e);
                setOpenClosePopConfirm(false);
                dispatch(closeFeedbackModal());
              } else {
                setOpenClosePopConfirm(false);
                dispatch(closeFeedbackModal());
              }
            }}
            onCancel={() => {
              setOpenClosePopConfirm(false);
              dispatch(closeFeedbackModal());
            }}
            onVisibleChange={(visible) => {
              if (!visible) {
                setOpenClosePopConfirm(false);
              }
            }}
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className:
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded",
            }}
          >
            <CloseGrButton
              onClick={() => {
                if (leadSaveToggle) {
                  handleCloseConfirmation();
                } else {
                  setOpenClosePopConfirm(false);
                  dispatch(closeFeedbackModal());
                }
              }}
              className="right-5"
            />
          </Popconfirm>

          <div className="col-span-7 flex flex-col space-y-5 min-h-full oveflow-y-auto">
            <div className="flex justify-between">
              <div className="text-gray-500 text-xs">
                <h2 className="xl:text-2xl text-base font-semibold text-black capitalize ">
                  {lead?.companyName}
                </h2>
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      onClick={() => handleStarClick(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {index < parseInt(lead.stage, 10) ? (
                        <AiFillStar className="text-yellow-400 text-2xl" />
                      ) : (
                        <AiOutlineStar className="text-gray-300 text-2xl" />
                      )}
                    </span>
                  ))}
                </div>
                <div className=" flex mt-2">
                  Creation Date:-
                  <p className="border rounded  focus:outline-none focus:border-blue-500  cursor-pointer border-none ml-3 tracking-wider">
                    {formatDate(lead?.leadDate)}
                  </p>
                </div>
                <div className="flex items-center">
                  Follow Up Date:-{" "}
                  <input
                    type="date"
                    name="followUpDate"
                    value={
                      lead?.followUpDate !== null ? lead?.followUpDate : ""
                    }
                    onChange={handleChange}
                    className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500  cursor-pointer border-none"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-xl">
                    <FcAbout />
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#7F56D9] w-20 sm:w-24 rounded-md py-1.5 xs:py-1 text-white self-start text-xs sm:text-[0.8rem] lg:hidden block"
              >
                Save
              </button>
            </div>
            <div className=" h-[70vh] overflow-y-auto border-[0.5px] rounded  flex flex-col space-y-5 px-5 py-5">
              <div className="flex  space-x-5  text-gray-500 text-xs">
                <div className="flex flex-col">
                  <label className="tracking-wide mb-1 text-black">
                    Status
                  </label>
                  <select
                    name="status"
                    value={lead.status || ""}
                    onChange={handleOptionChange}
                    className="border-[0.5px] rounded border-gray-200  px-[0.3rem] py-[0.42rem] capitalize outline-none text-gray-700"
                  >
                    <option value="" disabled selected>
                      Status :-
                    </option>
                    {["sent details", "sent quotation", "regretted", "po"].map(
                      (itemValue) => {
                        return (
                          <option
                            key={itemValue}
                            value={itemValue}
                            className=""
                          >
                            {itemValue}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>
                {lead.status === "sent quotation" && (
                  <div className="flex flex-col w-32">
                    <label className="tracking-wide mb-1 text-black">
                      Quotation Number
                    </label>
                    <input
                      type="text"
                      name="quotationNumber"
                      value={lead?.quotationNumber ? lead?.quotationNumber : ""}
                      className="border-[0.5px]  rounded border-gray-200 px-1.5 outline-none text-gray-700 text-[12px] py-[7.4px]"
                      onChange={handleChange}
                      placeholder="Add Quotation"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <label className="tracking-wide mb-1 text-black">
                    Assigned To
                  </label>
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="Assigned To"
                    filterOption={(input, option) =>
                      (option?.label.toLowerCase() ?? "").includes(
                        input.toLowerCase()
                      )
                    }
                    filterSort={(optionA: Option, optionB: Option) =>
                      optionA?.label
                        .toLowerCase()
                        .localeCompare(optionB?.label.toLowerCase())
                    }
                    className="custom-ant-select capitalize "
                    listHeight={200}
                    rootClassName="min-w-fit "
                    getPopupContainer={(triggerNode) => triggerNode}
                    options={members}
                    onChange={handleMember}
                    value={lead.assignedTo || selectedMember || "assigned to"}
                  />
                </div>
                {lead.status === "sent details" ? (
                  <button
                    className={`transition-all duration-300 sm:px-4 p-2  rounded cursor-pointer border-none outline -outline-offset-2 outline-1 capitalize text-white outline-none mt-[1.18rem] text-xs 
                    ${lead.detailsSent ? "bg-[#21c400]" : "bg-[#0017F7]"} `}
                    onClick={() => {
                      setLead({ ...lead, detailsSent: true });
                      dispatch(setLeadSaveToggleValue(true));
                    }}
                  >
                    {lead.detailsSent ? "Details Sent" : "Sent Details"}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <h2 className="text-xl font-semibold">Description</h2>
                <textarea
                  ref={textAreaRef}
                  name="description"
                  placeholder="Add some value"
                  value={
                    lead?.description
                      ? lead?.description.split("<br>").join("\n")
                      : ""
                  }
                  className="bg-[#F6F8F9] w-full px-4 py-4 rounded-md my-2 text-[#667085] text-sm outline-none    transition-height duration-300 ease-in-out "
                  onChange={(e) => {
                    setLead((prevLead) => ({
                      ...prevLead,
                      description: e.target.value,
                    }));
                    dispatch(setLeadSaveToggleValue(true));
                  }}
                  style={{ height: "auto" }}
                />
                {/* <div className="bg-[#F6F8F9] w-full px-4 py-4 rounded-md my-2 text-[#667085] text-sm outline-none    transition-height duration-300 ease-in-out ">
                  {lead?.description
                    ? lead?.description.split("<br>").join("\n")
                    : "add some text"}
                </div> */}
              </div>

              {/* comments section */}
              <div className=" pr-4 ">
                <div className="flex space-x-3">
                  <h2 className="font-semibold text-slate-600 mr-3">
                    {commentsObject?.length ?? 0} Comments
                  </h2>
                  {/* <button className="flex gap-x-1 items-center text-gray-400 font-semibold text-xs">
                    <AiOutlineBars className="text-black text-base" />
                    SORT BY
                  </button> */}
                </div>
                <div className="mt-2 flex flex-col ">
                  <div className="flex space-x-3 relative">
                    <h1 className="h-8 w-8 bg-[#0017F7] rounded-full text-white flex justify-center items-center text-base ">
                      {userDetails && userDetails.name
                        ? userDetails.name.charAt(0).toUpperCase()
                        : ""}
                    </h1>
                    <input
                      type="text"
                      name="comment"
                      value={comment}
                      onChange={(e) => {
                        e.preventDefault();
                        setComment(e.target.value);
                      }}
                      className="w-full border-b-2 border-gray-300 px-2 text-sm outline-none"
                      placeholder="Write a comment here ..."
                    />
                    <div
                      className="text-[#0017F7] bg-white p- text-2xl absolute right-0 cursor-pointer"
                      onClick={handleComment}
                    >
                      <BsFillArrowRightCircleFill />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5 mt-6">
                    {commentsObject &&
                      commentsObject.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex space-x-3 items-center capitalize"
                          >
                            <h1 className="h-8 w-8 bg-[#0017F7] rounded-full text-white flex justify-center items-center text-base  ">
                              {item?.name?.charAt(0)}
                            </h1>
                            <div className="flex flex-col text-[0.8rem]">
                              <h2 className="font-semibold ">
                                {item.name}{" "}
                                <span className="text-gray-400 text-[0.7rem] font-semibold">
                                  {formatDateFunction(item.date)}
                                </span>
                              </h2>
                              <h2>{item.text}</h2>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex space-x-4 ">
            <div className="text-xl pt-1">
              <AiOutlineBars />
            </div>
            <div className="w-full">
              <h2 className="text-xl font-semibold">Activity</h2>
              <p className="bg-[#F6F8F9] w-[80%] px-4 py-4 rounded-md my-2 text-[#667085] ">
                Write a comment
              </p>
            </div>
          </div>
          <div className="flex space-x-4 items-center ">
            <div className="text-xl px-3 py-1.5 rounded-md bg-[#0017f7] text-white ">
              A
            </div>
            <div className="w-full">
              <h2 className="text-xl font-semibold">
                A
                <span className="text-[#667085] text-[0.6rem] ml-2">
                  25 Aug 2023 at 10:30am
                </span>
              </h2>
              <p className="bg-[#F6F8F9] w-[80%] px-4 py-4 rounded-md my-2 text-[#667085] ">
                Today
              </p>
            </div>
          </div> */}
            {/* <div className="flex space-x-4 items-center ">
            <div className="text-xl px-3 py-1.5 rounded-md bg-[#0017f7] text-white ">
              A
            </div>
            <div className="w-full">
              <h2 className="text-xl font-semibold">
                B
                <span className="text-[#667085] text-[0.6rem] ml-2">
                  25 Aug 2023 at 10:30am
                </span>
              </h2>
              <p className="bg-[#F6F8F9] w-[80%] px-4 py-4 rounded-md my-2 text-[#667085] ">
                Please call again in two days
              </p>
            </div>
          </div> */}
          </div>
          <div className="border-[0.5px] p-2 col-span-5 mt-5 lg:mt-0  ">
            <div className="flex mb-2 items-center justify-between">
              <h2 className="font-semibold text-xl ">Company Details</h2>
              <Popconfirm
                title={popConfirmTitle}
                description={popConfirmDescription}
                open={openSavePopConfirm}
                onCancel={(e) => {
                  if (leadSaveToggle) {
                    handleSubmit(e);
                    setOpenSavePopConfirm(false);
                    dispatch(closeFeedbackModal());
                  } else {
                    setOpenSavePopConfirm(false);
                    dispatch(closeFeedbackModal());
                  }
                }}
                onConfirm={() => {
                  setOpenSavePopConfirm(false);
                }}
                onVisibleChange={(visible) => {
                  if (!visible) {
                    setOpenSavePopConfirm(false);
                  }
                }}
                okText="Yes"
                cancelText="No"
                okButtonProps={{
                  className:
                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded",
                }}
              >
                <button
                  type="button"
                  className="bg-[#7F56D9] w-20 sm:w-24 rounded-md py-1 xs:py-1 text-white self-start text-xs sm:text-[0.8rem] lg:block hidden"
                  onClick={(e) => {
                    if (leadSaveToggle) {
                      if (!lead.followUpDate) {
                        handleSaveConfirmation();
                      } else {
                        handleSubmit(e);
                      }
                    } else {
                      handleSubmit(e);
                      dispatch(closeFeedbackModal());
                    }
                  }}
                >
                  Save
                </button>
              </Popconfirm>
            </div>
            <hr className="mb-3" />
            <div className=" mt-1 flex flex-col space-y-4">
              <FormRow
                type="text"
                name="companyName"
                value={lead?.companyName ? lead?.companyName : ""}
                labelText="Company Name"
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="companyAddress"
                value={lead?.companyAddress ? lead?.companyAddress : ""}
                labelText="Company Name"
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="contactPersonName"
                value={lead?.contactPersonName ? lead?.contactPersonName : ""}
                labelText="Contact Person Name"
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="contactPersonEmail"
                value={lead?.contactPersonEmail ? lead?.contactPersonEmail : ""}
                labelText="Contact Email"
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="contactPersonPhone"
                value={lead?.contactPersonPhone ? lead?.contactPersonPhone : ""}
                labelText="Contact Phone"
                handleChange={handleChange}
              />
              <FormRowSelect
                name="source"
                value={lead?.source ? lead?.source : "Manual"}
                labelText="Source"
                handleOptionChange={handleOptionChange}
                list={["manual", "wtsp", "IMT", "mail", "other"]}
              />
              <FormRowSelect
                name="text"
                value={lead?.leadType ? lead?.leadType : "empty"}
                labelText="Lead Type"
                handleOptionChange={handleOptionChange}
                list={["a", "b", "c", "d"]}
              />

              <div className="grid grid-cols-2 gap-x-3">
                <FormRow
                  type="text"
                  name="city"
                  value={lead?.city ? lead?.city : ""}
                  labelText="City"
                  handleChange={handleChange}
                />
                <FormRow
                  type="text"
                  name="pincode"
                  value={lead?.pincode ? lead?.pincode : ""}
                  labelText="Pincode"
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default FeedbackModal;
