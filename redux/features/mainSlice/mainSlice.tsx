import { createSlice } from "@reduxjs/toolkit";

interface IinitialState {
    feature: boolean[]
    business: string;
    userId: string,
    mainLoader:any
}

let initialState: IinitialState = {
    mainLoader:true,
    feature:[false,false,false,false],
    business: "",
    userId:""
    
};

const mainSlice = createSlice({
    name: "mainSlice",
    initialState,
    reducers: {
        updateMainLoaderValue: (state, { payload }) => {
            state.mainLoader = payload;
        },
        setMainSliceValue:(state,{payload}:any)=>{
            state.business=payload.business
            state.userId=payload.userId;
            state.feature=payload.featureValue.split("").filter((e:string)=>e!=="1")
        }
    },
});

export const {
    updateMainLoaderValue,
    setMainSliceValue
} = mainSlice.actions;
export default mainSlice.reducer;
