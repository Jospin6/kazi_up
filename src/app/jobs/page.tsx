"use client"
import { fetchJobs, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Jobs() {
  const dispatch = useDispatch<AppDispatch>()
  const jobs = useSelector(selectJobs)

  useEffect(() => {
    dispatch(fetchJobs({page: 1}))
  }, [dispatch])

  return <div>

  </div>
}