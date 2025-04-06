"use client"
import { getJob, selectJob, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { formatRelativeTime, parseStringArray } from "@/lib/utils";
import { SubItem } from "@/components/ui/subItem";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";

const RichTextRenderer = dynamic(() => import('@/components/ui/RichTextRenderer'), {
  ssr: false,
});

export default function Job() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const job = useSelector(selectJob)

    useEffect(() => {
        dispatch(getJob(id!))
    }, [dispatch])
    return <div className="w-10/12 m-auto flex">
        <div className="w-8/12 pr-4">
            <h1 className="text-3xl font-bold text-gray-200">{job?.position}</h1>
            <div className="text-gray-400 ">{formatRelativeTime(job?.createdAt!)}, {job?.salaryRange}$</div>
            <div className="mt-4 text-gray-300 w-full">
                <div className="w-full flex flex-wrap">{parseStringArray(job?.tags!).map(tag => (<SubItem key={tag} title={tag} />))}</div>
                <div className="flex flex-wrap w-full">{parseStringArray(job?.jobRestricted!).map(res => (<SubItem key={res} title={res} />))}</div>
                {/* <Badge variant="outline">Badge</Badge> */}
            </div>
            <div className="flex mt-4 justify-start">
                <Button className="mr-4 px-10">Apply Now</Button>
                <Button className="bg-gray-800 text-gray-300 text-sm"><BellIcon size={17}/>Receive mails with simillar Jobs</Button>
            </div>
            <div className="mt-8">
                <h3 className="text-gray-300 font-semibold text-[16px]">Description</h3>
                <div className="text-gray-300">
                    <RichTextRenderer html={job?.description!} />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-gray-300 font-semibold text-[16px]">How to apply</h3>
                <div className="text-gray-300">
                    <RichTextRenderer html={job?.howToApply!} />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-gray-300 font-semibold text-[16px]">Simillar Jobs</h3>
                <div className="text-gray-300">
                    
                </div>
            </div>
        </div>
        <div className="w-4/12 pl-4">

        </div>
    </div>
}