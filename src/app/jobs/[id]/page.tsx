"use client"
import { getJob, selectJob, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Job () {
    const dispatch = useDispatch<AppDispatch>()
    const job = useSelector(selectJob)

    useEffect(() => {
        dispatch(getJob(""))
    }, [dispatch])
    return <div>
        
    </div>
}