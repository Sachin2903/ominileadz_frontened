"use client";
import { openAddSyncLeadsModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(openAddSyncLeadsModal());
  }, []);

  return <main className=""></main>;
};

export default Page;
