import { IMemberLead } from "@/src/@types";
import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  memberLeadRecord: IMemberLead;
}

let initialState: IinitialState = {
  memberLeadRecord: {
    assignedTo: "",
    count: 0,
    leadIds: [],
  },
};

const taskRecordSlice = createSlice({
  name: "taskRecordSlice",
  initialState,
  reducers: {
    setMemberLeadRecord: (state, { payload }) => {
      state.memberLeadRecord = payload;
    },
  },
});

export const { setMemberLeadRecord } = taskRecordSlice.actions;
export default taskRecordSlice.reducer;
