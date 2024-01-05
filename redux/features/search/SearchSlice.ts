import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  followUpLeadsQuery: string;
  companiesQuery: string;
  groupsQuery: string;
  teamMembersQuery: string;
  leadSourceQuery: string;
  contactPersonQuery: string;
  searchQuery: string;
}

let initialState: IinitialState = {
  followUpLeadsQuery: "",
  companiesQuery: "",
  groupsQuery: "",
  teamMembersQuery: "",
  leadSourceQuery: "",
  contactPersonQuery: "",
  searchQuery: "",
};

const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    setFollowUpLeadsQuery: (state, { payload }) => {
      state.followUpLeadsQuery = payload;
    },
    setCompaniesQuery: (state, { payload }) => {
      state.companiesQuery = payload;
    },
    setGroupsQuery: (state, { payload }) => {
      state.groupsQuery = payload;
    },
    setTeamMembersQuery: (state, { payload }) => {
      state.teamMembersQuery = payload;
    },
    setLeadSourceQuery: (state, { payload }) => {
      state.leadSourceQuery = payload;
    },
    setContactPersonQuery: (state, { payload }) => {
      state.contactPersonQuery = payload;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
});

export const {
  setFollowUpLeadsQuery,
  setCompaniesQuery,
  setGroupsQuery,
  setTeamMembersQuery,
  setLeadSourceQuery,
  setContactPersonQuery,
  setSearchQuery,
} = SearchSlice.actions;
export default SearchSlice.reducer;
