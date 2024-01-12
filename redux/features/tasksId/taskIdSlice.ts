import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  groupId: string;
  teamId: string;
  leadId: string;
  businessId: string;
  editContactId: string;
  contactPersonId: string;
}

let initialState: IinitialState = {
  groupId: "",
  teamId: "",
  leadId: "",
  businessId: "",
  editContactId: "",
  contactPersonId: "",
};

const tasksIdSlice = createSlice({
  name: "tasksIdSlice",
  initialState,
  reducers: {
    setGroupIdValue: (state, { payload }) => {
      state.groupId = payload;
    },
    setTeamIdValue: (state, { payload }) => {
      state.teamId = payload;
    },
    setLeadIdValue: (state, { payload }) => {
      state.leadId = payload;
    },
    setBusinessIdValue: (state, { payload }) => {
      state.businessId = payload;
    },
    setEditContactIdValue: (state, { payload }) => {
      state.editContactId = payload;
    },
    setContactPersonId: (state, { payload }) => {
      state.contactPersonId = payload;
    },
  },
});

export const {
  setGroupIdValue,
  setTeamIdValue,
  setLeadIdValue,
  setBusinessIdValue,
  setEditContactIdValue,
  setContactPersonId,
} = tasksIdSlice.actions;
export default tasksIdSlice.reducer;
