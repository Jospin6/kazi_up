import { Job } from "@/redux/job/jobSlice"
import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import { Card } from "./card"
import { useEffect, useState } from "react"
import { AvatarImage } from "@radix-ui/react-avatar"
import { formatRelativeTime, parseStringArray } from "@/lib/utils"
import { SubItem } from "./subItem"

export const MainCard = ({ job }: { job: Job }) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        const imageUrl = `/api/companyLogo?jobId=${job.id}`;
        setAvatarUrl(imageUrl);
    }, [job?.id]);

    return <Card className="bg-gray-900 border-gray-800 mt-2">
        <div className="flex">
            <Avatar className="size-[40px]">
                <AvatarImage src={avatarUrl!} />
                <AvatarFallback>{job.companyName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-gray-200 text-xl font-semibold"> {job.position} </h1>
                    <div>
                        <span className="text-gray-400">{formatRelativeTime(job.createdAt!)}</span>
                        <Button className="ml-4">Apply the job</Button>
                    </div>
                </div>
                <div>
                    <h1 className="text-gray-400 text-sm"> {job.companyName} </h1>
                </div>
                <div className="mt-4 text-gray-300 w-full">
                    <div className="w-full flex flex-wrap">{parseStringArray(job.tags).map(tag => (<SubItem key={tag} title={tag} />))}</div>
                    <div className="flex flex-wrap w-full">{parseStringArray(job.jobRestricted).map(res => (<SubItem key={res} title={res} />))}</div>
                    {/* <Badge variant="outline">Badge</Badge> */}
                </div>
            </div>
        </div>
    </Card>
}