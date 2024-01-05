import { createSlice } from '@reduxjs/toolkit';

interface IinitialState{
  name: string,
  email: string,
  password: string,
  role: string[],
  mobile: string,
}

let initialState:IinitialState ={
  name: "",
  email: "",
  password: "",
  role:  ["caller", "member", "owner", "manager"],
  mobile: "",
}

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
 
  },
});

export const {  } = memberSlice.actions;
export default memberSlice.reducer;