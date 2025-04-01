"use client"
import { fetchJobs, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const jobs = useSelector(selectJobs)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  return (
    <div className="">
      
    </div>
  );
}
