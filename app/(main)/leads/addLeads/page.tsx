"use client";
import { openAddLeadsManuallyModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(openAddLeadsManuallyModal());
  }, []);

  return <main className=""></main>;
};

export default Page;
