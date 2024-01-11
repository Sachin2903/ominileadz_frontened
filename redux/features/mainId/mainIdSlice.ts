import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  // groupId: string;
  // teamId: string;
  // leadId: string;
  businessId: string;
  // editContactId: string;
  // contactPersonId: string;
  feature:boolean[],
  userId:string
}

let initialState: IinitialState = {
  // groupId: "",
  // teamId: "",
  // leadId: "",
  businessId: "",
  feature:[false,false,false,false],
  userId:"",
  // editContactId: "",
  // contactPersonId: "",
};

const mainIdSlice = createSlice({
  name: "mainIdSlice",
  initialState,
  reducers: {
    setStateValue:(state,{payload})=>{
       state.businessId=payload.businessId,
       state.feature=payload.feature,
       state.userId=payload.userId
    }
    // setGroupIdValue: (state, { payload }) => {
    //   state.groupId = payload;
    // },
    // setTeamIdValue: (state, { payload }) => {
    //   state.teamId = payload;
    // },
    // setLeadIdValue: (state, { payload }) => {
    //   state.leadId = payload;
    // },
    // setBusinessIdValue: (state, { payload }) => {
    //   state.businessId = payload;
    // },
    // setEditContactIdValue: (state, { payload }) => {
    //   state.editContactId = payload;
    // },
    // setContactPersonId: (state, { payload }) => {
    //   state.contactPersonId = payload;
    // },
  },
});

export const {
  setStateValue
  // setGroupIdValue,
  // setTeamIdValue,
  // setLeadIdValue,
  // setBusinessIdValue,
  // setEditContactIdValue,
  // setContactPersonId,
} = mainIdSlice.actions;
export default mainIdSlice.reducer;
