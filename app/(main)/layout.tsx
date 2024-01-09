"use client";
import React, { ReactNode } from "react";
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
import { useAppDispatch } from "@/redux/store";
import MemberLeadsInfoModal from "@/components/modals/MemberLeadsInfoModal";
import AddLeadsManually from "@/components/modals/AddLeadsManually";
import AddSyncLeadsModal from "@/components/modals/AddSyncLeads";
import FeedbackModal from "@/components/modals/FeedbackModal";
import AddcontactDetailsModal from "@/components/modals/AddContactDetailsModal";
import UpdateTeamMemberModel from "@/components/modals/UpdateTeamMemberModal";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="flex ">
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

      <div className="w-full relative  overflow-y-auto max-h-screen">
        <Navbar
        
          placeholder="Search "
          inputValue={searchQuery}
          handleInputChange={handleInputChange}
        />
        <main className="px-5 xs:mt-0 mt-14 mb-[90px] xs:mb-3 md:px-7">{children}</main>
      </div>
      <SmallAside />
    </div>
  );
};

export default MainLayout;
