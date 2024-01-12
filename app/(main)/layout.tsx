"use client";
import React, { ReactNode, useEffect, useReducer, useState } from "react";
import {
  AddGroupMemberModal,
  AddGroupModal,
  Aside,
  Navbar,
  SubMenu,
  TeamMemberModel,
  UpdateBusinessDetailsModal,
} from "@/components";
import SmallAside from "@/components/SmallAside";
import { useAppSelector } from "@/redux/hooks";
import EditContactDetailsModal from "@/components/modals/EditContactDetailsModal";
import AddCompanyInfo from "@/components/modals/AddCompanyInfo";
import {
  setCompaniesQuery,
  setSearchQuery,
} from "@/redux/features/search/SearchSlice";
import { updateMainLoaderValue,setMainSliceValue } from "@/redux/features/mainSlice/mainSlice";
import { useAppDispatch } from "@/redux/store";
import MemberLeadsInfoModal from "@/components/modals/MemberLeadsInfoModal";
import AddLeadsManually from "@/components/modals/AddLeadsManually";
import AddSyncLeadsModal from "@/components/modals/AddSyncLeads";
import FeedbackModal from "@/components/modals/FeedbackModal";
import AddcontactDetailsModal from "@/components/modals/AddContactDetailsModal";
import UpdateTeamMemberModel from "@/components/modals/UpdateTeamMemberModal";
import Lottie from 'lottie-react';
import bar_lottie_animation from "@/src/assets/lottie_animation/bar-loader.json";
import jwtDecode from 'jwt-decode';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mainLoader,feature,business,userId}:{mainLoader:boolean,feature:boolean[],business:string,userId:string} = useAppSelector(
    (state: { mainSlice: any }) => state.mainSlice
  );
  // console.log(mainLoader,feature,business,userId)
  // modal slice
  const {
    isMemberLeadsInfoModalOpen,
    isAddLeadsManuallyModalOpen,
    isAddSyncLeadsModalOpen,
    isFeedbackModalOpen,
    isAddCompanyInfoModalOpen,
    isUpdateContactIdModalOpen,
    isAddContactDetailsModalOpen,
    isModalOpen,
    isUpdateTeamMemberModalOpen,
    isUpdateBusinessDetailsModalOpen,
    isAddGroupModalOpen,
    isUpdateGroupMemberModalOpen,
  } = useAppSelector((state: { modal: any }) => state.modal);

  // search slice
  const { searchQuery } = useAppSelector(
    (state: { SearchSlice: any }) => state.SearchSlice
  );

  //task record slice
  const { memberLeadRecord: record } = useAppSelector(
    (state: { taskRecordSlice: any }) => state.taskRecordSlice
  );

  const { leadId, contactId, teamId, businessId, groupId } = useAppSelector(
    (state: { tasksIdSlice: any }) => state.tasksIdSlice
  );

  const handleInputChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };


  // store feature and other details
  useEffect(() => {
    function logOut(dataToDesplay="Session Expire") {
      toast.error(dataToDesplay, {
        duration: 1500
      })
      localStorage.clear();
      router.replace("/login")
    }
    async function extractDataFromJWT() {
        let accessToken = localStorage.getItem("accessToken");
        let expireAccessToken = localStorage.getItem("accessTokenExpiry"); // Correct variable name

        if (expireAccessToken) {
          if (Number(expireAccessToken) < Number(Date.now())) {
            logOut()
          }
        } else {
          logOut()
        }
        if (accessToken) {
          const decodedToken: { feature: string; sub: string; business: string } = jwtDecode(accessToken);
        
          if (decodedToken && decodedToken.feature && decodedToken.sub && decodedToken.business) {
           //@ts-ignore
            dispatch(setMainSliceValue({ business: decodedToken.business.toString(), featureValue:decodedToken.feature.toString(), userId: decodedToken.sub.toString() }));
          } else {
            logOut();
          }
        }
    }

    extractDataFromJWT();
    let timeoutId=setTimeout(()=>{
      dispatch(updateMainLoaderValue(false))
    },3000)

    return ()=>clearTimeout(timeoutId)
  }, [mainLoader]);




  return (
    <div className="flex ">
      <Toaster position="top-right" />
      <Aside />
      {/* dashboard page modals */}
      {isMemberLeadsInfoModalOpen && <MemberLeadsInfoModal record={record} />}

      {/* leads page modals */}
      {isFeedbackModalOpen && leadId && <FeedbackModal leadId={leadId} />}
      {isAddSyncLeadsModalOpen && <AddSyncLeadsModal />}
      {isAddLeadsManuallyModalOpen && <AddLeadsManually />}

      {/* Company page modals */}
      {isAddCompanyInfoModalOpen && <AddCompanyInfo />}

      {/* Contacts page modals */}
      {isUpdateContactIdModalOpen && (
        <EditContactDetailsModal contactId={contactId} />
      )}
      {isAddContactDetailsModalOpen && <AddcontactDetailsModal />}

      {/* Settings Page modals */}
      {/* settings team page modals */}
      {isUpdateTeamMemberModalOpen && <UpdateTeamMemberModel teamId={teamId} />}
      {isModalOpen && <TeamMemberModel />}

      {/* settings businessDetails modals */}
      {isUpdateBusinessDetailsModalOpen && (
        <UpdateBusinessDetailsModal businessId={businessId} />
      )}

      {/* settings group modals  */}

      {isAddGroupModalOpen && <AddGroupModal />}
      {isUpdateGroupMemberModalOpen && (
        <AddGroupMemberModal groupId={groupId} />
      )}

      {
        mainLoader ? <div className="flex justify-center items-center absolute z-[10000] top-0 w-screen h-screen bg-gray-50">
          <Lottie
            animationData={bar_lottie_animation}
            loop={true}
            autoPlay={true}
            style={{ width: '300px', height: '300px' }}
          />
        </div> : null
      }

      <div className="w-full z-[90]  overflow-y-auto max-h-screen">
        <Navbar
          placeholder="Search "
          inputValue={searchQuery}
          handleInputChange={handleInputChange}
        />
        <main className="px-5 mb-[90px] xs:mb-3 md:px-7">{children}</main>
      </div>
      <SmallAside />
    </div>
  );
};

export default MainLayout;
