import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IModalInitialState = {
  isModalOpen: boolean;
  isUpdateGroupMemberModalOpen: boolean;
  isAddGroupModalOpen: boolean;
  isEditTeamModalOpen: boolean;
  isBusinessDetailsModalOpen: boolean;
  isAddLeadsManuallyModalOpen: boolean;
  isFeedbackModalOpen: boolean;
  isAddSyncLeadsModalOpen: boolean;
  isUpdateTeamMemberModalOpen: boolean;
  isUpdateBusinessDetailsModalOpen: boolean;
  isMemberLeadsInfoModalOpen: boolean;
  isAddCompanyInfoModalOpen: boolean;
  isAddContactDetailsModalOpen: boolean;
  isUpdateContactIdModalOpen: boolean;
};

const initialState: IModalInitialState = {
  isModalOpen: false,
  isUpdateGroupMemberModalOpen: false,
  isEditTeamModalOpen: false,
  isBusinessDetailsModalOpen: false,
  isAddGroupModalOpen: false,
  isAddLeadsManuallyModalOpen: false,
  isFeedbackModalOpen: false,
  isAddSyncLeadsModalOpen: false,
  isUpdateTeamMemberModalOpen: false,
  isUpdateBusinessDetailsModalOpen: false,
  isMemberLeadsInfoModalOpen: false,
  isAddCompanyInfoModalOpen: false,
  isAddContactDetailsModalOpen: false,
  isUpdateContactIdModalOpen: false,
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    openUpdateGroupMemberModal: (state) => {
      state.isUpdateGroupMemberModalOpen = true;
    },
    closeUpdateGroupMemberModal: (state) => {
      state.isUpdateGroupMemberModalOpen = false;
    },
    openEditTeamMemberModal: (state) => {
      state.isEditTeamModalOpen = true;
    },
    closeEditTeamMemberModal: (state) => {
      state.isEditTeamModalOpen = false;
    },
    openBusinessDetailsModal: (state) => {
      state.isBusinessDetailsModalOpen = true;
    },
    closeBusinessDetailsModal: (state) => {
      state.isBusinessDetailsModalOpen = false;
    },
    openAddGroupModal: (state) => {
      state.isAddGroupModalOpen = true;
    },
    closeAddGroupModal: (state) => {
      state.isAddGroupModalOpen = false;
    },
    openAddLeadsManuallyModal: (state) => {
      state.isAddLeadsManuallyModalOpen = true;
    },
    closeAddLeadsManuallyModal: (state) => {
      state.isAddLeadsManuallyModalOpen = false;
    },
    openFeedbackModal: (state) => {
      state.isFeedbackModalOpen = true;
    },
    closeFeedbackModal: (state) => {
      state.isFeedbackModalOpen = false;
    },
    openAddSyncLeadsModal: (state) => {
      state.isAddSyncLeadsModalOpen = true;
    },
    closeAddSyncLeadsModal: (state) => {
      state.isAddSyncLeadsModalOpen = false;
    },
    openUpdateTeamMemberModal: (state) => {
      state.isUpdateTeamMemberModalOpen = true;
    },
    closeUpdateTeamMemberModal: (state) => {
      state.isUpdateTeamMemberModalOpen = false;
    },
    openUpdateBusinessDetailsModal: (state) => {
      state.isUpdateBusinessDetailsModalOpen = true;
    },
    closeUpdateBusinessDetailsModal: (state) => {
      state.isUpdateBusinessDetailsModalOpen = false;
    },
    openMemberLeadsInfoModal: (state) => {
      state.isMemberLeadsInfoModalOpen = true;
    },
    closeMemberLeadsInfoModal: (state) => {
      state.isMemberLeadsInfoModalOpen = false;
    },
    openAddCompanyInfoModal: (state) => {
      state.isAddCompanyInfoModalOpen = true;
    },
    closeAddCompanyInfoModal: (state) => {
      state.isAddCompanyInfoModalOpen = false;
    },
    openAddContactDetailsModal: (state) => {
      state.isAddContactDetailsModalOpen = true;
    },
    closeAddContactDetailsModal: (state) => {
      state.isAddContactDetailsModalOpen = false;
    },
    openEditContactDetailsModal: (state) => {
      state.isUpdateContactIdModalOpen = true;
    },
    closeEditContactDetailsModal: (state) => {
      state.isUpdateContactIdModalOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openUpdateGroupMemberModal,
  closeUpdateGroupMemberModal,
  openEditTeamMemberModal,
  closeEditTeamMemberModal,
  openBusinessDetailsModal,
  closeBusinessDetailsModal,
  openAddGroupModal,
  closeAddGroupModal,
  openAddLeadsManuallyModal,
  closeAddLeadsManuallyModal,
  openFeedbackModal,
  closeFeedbackModal,
  openAddSyncLeadsModal,
  closeAddSyncLeadsModal,
  openUpdateTeamMemberModal,
  closeUpdateTeamMemberModal,
  openUpdateBusinessDetailsModal,
  closeUpdateBusinessDetailsModal,
  openEditContactDetailsModal,
  closeEditContactDetailsModal,
  openMemberLeadsInfoModal,
  closeMemberLeadsInfoModal,
  openAddCompanyInfoModal,
  closeAddCompanyInfoModal,
  openAddContactDetailsModal,
  closeAddContactDetailsModal,
} = modal.actions;
export default modal.reducer;
