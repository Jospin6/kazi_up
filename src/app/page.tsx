"use client"
import { fetchJobs, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ArrowDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const jobs = useSelector(selectJobs)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  return (
    <div className="">
      <div className="text-center">
        <h1 className="text-6xl bg-gradient-to-r from-[#18CB96] to-gray-300 bg-clip-text text-transparent font-bold">
          Find Your Dream Job in Minutes
        </h1>
        <h4 className="text-2xl text-gray-300 mt-3">Speed up your job search and land your ideal role</h4>
      </div>
      <div className="w-8/12 m-auto">
        <div className="flex justify-center mt-6">
          <div className="flex items-center h-[40px] rounded-2xl border">
            <Search size={25} className="text-gray-300 font-bold mx-[5px]" />
            <Input placeholder="Keyword" className="w-[300px] border-none text-gray-100" />
          </div>
        </div>
        <div className="flex justify-center text-gray-200 mt-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
              <span>Search</span>
              <ArrowDown size={12} className="ml-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Search</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Software</DropdownMenuItem>
              <DropdownMenuItem>Web dev</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Data entry</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
              <span>Location</span>
              <ArrowDown size={12} className="ml-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My loation</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>United state</DropdownMenuItem>
              <DropdownMenuItem>France</DropdownMenuItem>
              <DropdownMenuItem>London</DropdownMenuItem>
              <DropdownMenuItem>Rwanda</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
              <span>Experience</span>
              <ArrowDown size={12} className="ml-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Experience</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Entry level</DropdownMenuItem>
              <DropdownMenuItem>Mid level</DropdownMenuItem>
              <DropdownMenuItem>Senior</DropdownMenuItem>
              <DropdownMenuItem>Lead</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
              <span>Date posted</span>
              <ArrowDown size={12} className="ml-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Date posted</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Any time</DropdownMenuItem>
              <DropdownMenuItem>24 ago</DropdownMenuItem>
              <DropdownMenuItem>This month</DropdownMenuItem>
              <DropdownMenuItem>last 3 months</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">Remote</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <span>My Remote</span>
                <ArrowDown size={12} className="ml-3" />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>On site</DropdownMenuItem>
              <DropdownMenuItem>Hybrid</DropdownMenuItem>
              <DropdownMenuItem>Remote</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-10">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">1.3K Jobs</span>
          </div>
          <div>
            <Card className="bg-gray-900 border-gray-800 mt-2">
              <div className="flex">
                <Avatar className="size-[40px]">
                  <AvatarFallback>JN</AvatarFallback>
                </Avatar>
                <div className="ml-4 w-full">
                  <div className="flex items-center justify-between">
                    <h1 className="text-gray-200 text-xl font-semibold">Job Title</h1>
                    <div>
                      <span className="text-gray-400">2d</span>
                      <Button className="ml-4">Apply the job</Button>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-gray-400 text-sm">Company name</h1>
                  </div>
                  <div className="mt-4 text-gray-300 flex flex-wrap">
                    <h4 className="px-4 py-[3px] text-sm rounded-2xl border border-gray-700 mt-2 mr-2">Item 1</h4>
                    <h4 className="px-4 py-[3px] text-sm rounded-2xl border border-gray-700 mt-2 mr-2">Item 2</h4>
                    <h4 className="px-4 py-[3px] text-sm rounded-2xl border border-gray-700 mt-2 mr-2">Item 3</h4>
                    <h4 className="px-4 py-[3px] text-sm rounded-2xl border border-gray-700 mt-2 mr-2">Item 4</h4>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
