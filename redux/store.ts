import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modal/modalSlice";

import mainIdSlice from "./features/mainId/mainIdSlice";
import taskRecordSlice from "./features/taskRecord/taskRecordSlice";
import SearchSlice from "./features/search/SearchSlice";
import filterLeadsSlice from "./features/filterLeads/filterLeadsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    mainIdSlice,
    taskRecordSlice,
    SearchSlice,
    filterLeadsSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
