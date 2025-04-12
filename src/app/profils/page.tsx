"use client"
import { fetchJobs, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowDownIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { MainCard } from "@/components/ui/mainCard";
import { fetchJobCategories, selectJobCategories } from "@/redux/jobCategory/jobCategorySlice";
import { parseStringArray, transformStringTagsToArray, transformStringToArray } from "@/lib/utils";
import { SubItem } from "@/components/ui/subItem";
import { ProfilItem } from "@/components/ui/profilItem";

export default function Profils() {
    const dispatch = useDispatch<AppDispatch>()
    const jobs = useSelector(selectJobs)
    const jobCategories = useSelector(selectJobCategories)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTags, setSelectedTags] = useState<string>("")
    const [filteredTags, setFilteredTags] = useState<string[]>([])
    const [filteredLocations, setFilteredLocations] = useState<string[]>([])

    const [filteredExperiences, setFilteredExperiences] = useState<string[]>([])
    const [filteredDate, setFilteredDate] = useState<string>("")
    const [filteredRemotes, setFilteredRemotes] = useState<string[]>([])

    const searchHistory = jobCategories.map(cat => cat.title)

    const tags = transformStringToArray(selectedTags)

    const locations = jobs.map(job => parseStringArray(job.jobRestricted).map(res => res))
    const locationsSet = new Set<string>()
    locations.forEach(location => {
        location.forEach(loc => {
            if (loc) {
                locationsSet.add(loc)
            }
        })
    })
    const locationsArray = Array.from(locationsSet)


    useEffect(() => {
        dispatch(fetchJobs())
        dispatch(fetchJobCategories())
    }, [dispatch])

    const filteredHistory = searchHistory.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelect = (title: string) => {
        setSearchTerm(title)
        setIsOpen(false)

        // Trouver la catégorie correspondante et stocker les tags
        const selectedCategory = jobCategories.find(cat => cat.title === title)
        if (selectedCategory) {
            setSelectedTags(selectedCategory.tags)
        }
    }

    const removeItem = (i: any) => {
        let newTags = filteredTags.filter((_, index) => index !== i)
        setFilteredTags([...newTags])
    }
    const removeLocation = (i: any) => {
        let newLocations = filteredLocations.filter((_, index) => index !== i)
        setFilteredLocations([...newLocations])
    }

    const removeExperience = (i: any) => {
        let newExperiences = filteredExperiences.filter((_, index) => index !== i)
        setFilteredExperiences([...newExperiences])
    }
    const removeDate = () => {
        setFilteredDate("")
    }
    const removeRemote = (i: any) => {
        let newRemotes = filteredRemotes.filter((_, index) => index !== i)
        setFilteredRemotes([...newRemotes])
    }


    return (
        <div className="">
            <div className="w-8/12 m-auto">
                <div className="flex justify-center mt-6 relative">
                    <div className="flex items-center h-[40px] rounded-2xl border relative bg-[#1f1f1f]">
                        <Search size={25} className="text-gray-300 font-bold mx-[5px]" />
                        <Input
                            placeholder="Search sector"
                            className="w-[300px] border-none text-gray-100 bg-transparent focus:outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 200)} // délai pour laisser le temps de cliquer
                        />
                    </div>

                    {isOpen && (
                        <div className="absolute top-[50px] w-[320px] bg-[#2a2a2a] border border-gray-700 rounded-xl shadow-lg z-50">
                            <ul className="p-2 text-sm text-white space-y-1">
                                {filteredHistory.length > 0 ? (
                                    filteredHistory.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="px-3 py-1 hover:bg-[#3a3a3a] cursor-pointer rounded-md"
                                            onClick={() => handleSelect(item)}
                                        >
                                            {item}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-gray-400 italic">No results found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex justify-center text-gray-200 mt-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
                            <span>Add skills you're hiring</span>
                            <ArrowDown size={12} className="ml-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {tags.map(tag => (
                                <DropdownMenuItem key={tag} onClick={() => setFilteredTags([...filteredTags, tag])}>
                                    {tag}
                                </DropdownMenuItem>))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="mr-4 border px-2 py-[2px] rounded-lg flex items-center">
                            <span>Location</span>
                            <ArrowDown size={12} className="ml-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {locationsArray.map(location => (
                                <DropdownMenuItem key={location} onClick={() => setFilteredLocations([...filteredLocations, location])}>
                                    {location}
                                </DropdownMenuItem>))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
                <div className="w-full flex flex-wrap h-auto mt-4">
                    {filteredTags.map((tag, i) => (<SubItem key={tag} title={tag} onClick={() => removeItem(i)} isRemovable className="text-gray-300" />))}
                    {filteredLocations.map((loc, i) => (<SubItem key={loc} title={loc} onClick={() => removeLocation(i)} isRemovable className="text-gray-300" />))}
                    {filteredExperiences.map((exp, i) => (<SubItem key={exp} title={exp} onClick={() => removeExperience(i)} isRemovable className="text-gray-300" />))}
                    {filteredRemotes.map((rm, i) => (<SubItem key={rm} title={rm} onClick={() => removeRemote(i)} isRemovable className="text-gray-300" />))}
                    {filteredDate != "" && (<SubItem title={filteredDate} onClick={removeDate} isRemovable className="text-gray-300" />)}
                </div>
            </div>
            <div className="w-10/12 m-auto">
                <div className="mt-10">
                    <div className="flex justify-between">
                        {/* <span className="text-sm text-gray-300">{visibleJobs.length} Jobs</span> */}
                    </div>
                    <div className="grid grid-cols-8 gap-4 pb-16">
                        <ProfilItem className="col-span-2"/>
                        <ProfilItem className="col-span-2"/>
                        <ProfilItem className="col-span-2"/>
                        <ProfilItem className="col-span-2"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
