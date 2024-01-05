import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  leadCategory: string;
  leadSubCategory: string;
  leadSaveToggle: boolean;
}

let initialState: IinitialState = {
  leadCategory: "",
  leadSubCategory: "",
  leadSaveToggle: false,
};

const filterLeadsSlice = createSlice({
  name: "filterLeadsSlice",
  initialState,
  reducers: {
    setLeadCategoryTextValue: (state, { payload }) => {
      state.leadCategory = payload;
    },
    setLeadSubCategoryTextValue: (state, { payload }) => {
      state.leadSubCategory = payload;
    },
    setLeadSaveToggleValue: (state, { payload }) => {
      console.log("payload", payload);

      state.leadSaveToggle = payload;
    },
  },
});

export const {
  setLeadCategoryTextValue,
  setLeadSubCategoryTextValue,
  setLeadSaveToggleValue,
} = filterLeadsSlice.actions;
export default filterLeadsSlice.reducer;
