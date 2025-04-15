"use client"
import { getJob, selectJob, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { formatRelativeTime, parseStringArray } from "@/lib/utils";
import { SubItem } from "@/components/ui/subItem";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimillarJobs } from "@/components/ui/simillarJobs";

const RichTextRenderer = dynamic(() => import('@/components/ui/RichTextRenderer'), {
    ssr: false,
});

export default function Job() {
    const params = useParams();
    const id = params?.id
    const dispatch = useDispatch<AppDispatch>()
    const job = useSelector(selectJob)

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const imageUrl = `/api/companyLogo?jobId=${job?.id}`;
        setAvatarUrl(imageUrl);
    }, [job?.id]);

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
                <Button className="bg-gray-800 text-gray-300 text-sm"><BellIcon size={17} />Receive mails with simillar Jobs</Button>
            </div>
            <div className="mt-8">
                <h3 className="text-gray-300 font-semibold text-[16px]">Description</h3>
                <div className="text-gray-300">
                    <RichTextRenderer html={job?.description!} />
                </div>
            </div>

            <div className="mt-8 border border-gray-700 rounded-2xl p-4">
                <h3 className="text-gray-300 font-semibold text-[16px]">How to apply</h3>
                <Button className="mr-4 px-10 w-full my-4">Apply Now</Button>
                <div className="text-gray-300 text-center">
                    <RichTextRenderer html={job?.howToApply!} />
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-gray-300 font-semibold text-[16px]">Simillar Jobs</h3>
                <div className="mt-4">
                    <SimillarJobs job={job!}/>
                </div>
            </div>
        </div>
        <div className="w-4/12 pl-4">
            <div className="w-3/4 m-auto text-center p-4 bg-gray-800 h-[400px] rounded-2xl">
                <div className="flex justify-center mb-3">
                    <Avatar className="size-[150px]">
                        <AvatarImage src={avatarUrl!} />
                        <AvatarFallback className="text-6xl font-bold">{job?.companyName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-2xl text-gray-300 font-bold">
                    {job?.companyName}
                </div>
                <Button className="mr-4 px-10 w-full my-4">Apply Now</Button>
                <p className="text-gray-300 text-sm">👀 1,966 views</p>
                <p className="text-gray-300 text-sm">✅ 364 applied (19%)</p>
            </div>
        </div>
    </div>
}