"use client"
import { fetchJobs, selectJobs } from "@/redux/job/jobSlice";
import { AppDispatch, RootState } from "@/redux/store";
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
import { fetchUsers } from "@/redux/user/userSlice";
import { Combobox } from "@/components/ui/combobox";
import { useTranslation } from 'react-i18next'

export default function Profils() {
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const jobs = useSelector(selectJobs)
    const jobCategories = useSelector(selectJobCategories)
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTags, setSelectedTags] = useState<string>("")
    const [filteredTags, setFilteredTags] = useState<string[]>([])
    const [filteredLocations, setFilteredLocations] = useState<string[]>([])
    const { loading, users } = useSelector((state: RootState) => state.user)
    const [selectedTTags, setSelectedTTags] = useState<string[]>([])
    const toggleTag = (tag: string) => {
        setSelectedTTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }
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
        dispatch(fetchUsers())
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

    const filteredUsers = users.filter((user) => {
        const userSkills = transformStringToArray(user.skills || "").map((s) => s.toLowerCase())
        const userLocation = user.location?.toLowerCase()
      
        // ✅ Filtrage par location
        const locationMatches =
          filteredLocations.length === 0 ||
          filteredLocations.map(loc => loc.toLowerCase()).includes(userLocation || "")
      
        if (!locationMatches) return false // ❌ user filtré par location
      
        // ✅ Cas 1 : aucun tag global → retourner tous les users
        if (!tags || tags.length === 0) {
          return true
        }
      
        // ✅ Cas 2 : aucun tag sélectionné → users avec AU MOINS 1 tag dans "tags"
        if (selectedTags.length === 0) {
          return tags.some(tag => userSkills.includes(tag.toLowerCase()))
        }
      
        // ✅ Cas 3 : tags sélectionnés → users avec TOUS les selectedTags
        return selectedTTags.every(tag => userSkills.includes(tag.toLowerCase()))
      })
      

    const removeLocation = (value: string) => {
        let newLocations = filteredLocations.filter((val) => val !== value)
        setFilteredLocations([...newLocations])
    }

    const removeFilteredUsers = () => {
        setSelectedTTags([])
        setFilteredLocations([])
    }

    return (
        <div className="">
            <div className="text-center">
                <h1 className="text-6xl bg-gradient-to-r from-[#18CB96] to-gray-300 bg-clip-text text-transparent font-bold">
                    {t("bigTitle")}
                </h1>
                <h4 className="text-2xl text-gray-300 mt-3">
                {t("subBigTitle")}
                </h4>
            </div>
            <div className="w-8/12 m-auto">
                <div className="flex justify-center mt-6 relative">
                    <div className="flex items-center h-[40px] rounded-2xl border relative bg-[#1f1f1f]">
                        <Search size={25} className="text-gray-300 font-bold mx-[5px]" />
                        <Input
                            placeholder={t("searchSector")}
                            className="w-[300px] border-none text-gray-100 bg-transparent focus:outline-none"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
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
                                    <li className="px-3 py-2 text-gray-400 italic">{t("noResultsFound")}</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="flex justify-between text-gray-200 mt-6">
                    <Combobox
                        placeholder={t("skllsyouhiring")}
                        items={[...tags.map(tag => ({ value: tag, label: tag }))]} onSelectItem={(value) => {
                            setSelectedTTags([...selectedTTags, value])
                        }} />

                    <Combobox
                        placeholder={t("location")}
                        items={[...locationsArray.map(location => ({ value: location, label: location }))]} onSelectItem={(value) => {
                            setFilteredLocations([...filteredLocations, value])
                        }} />

                </div>
                <div className="w-full flex flex-wrap h-auto mt-4">
                    {selectedTTags.map(tag => (
                        <SubItem
                            key={tag}
                            title={tag}
                            isRemovable
                            mainClick={() => toggleTag(tag)}
                            className="text-gray-300 bg-black cursor-pointer"
                        />
                    ))}
                    {filteredLocations.map(loc => (
                        <SubItem
                            key={loc}
                            title={loc}
                            mainClick={() => removeLocation(loc)}
                            isRemovable
                            className="text-gray-300 bg-black cursor-pointer"
                        />
                    ))}
                    {tags
                        .filter(tag => !selectedTTags.includes(tag))
                        .map(tag => (
                            <SubItem
                                key={tag}
                                title={tag}
                                mainClick={() => toggleTag(tag)}
                                className="text-gray-300 cursor-pointer"
                            />
                        ))}
                    {(filteredUsers.length > 0 && selectedTTags.length > 0 || filteredLocations.length > 0 ) && (<SubItem
                        title={`Clear ${filteredUsers.length} tags`}
                        mainClick={removeFilteredUsers}
                        isRemovable
                        className="border border-red-500 text-red-500 cursor-pointer"
                    />)}
                </div>
            </div>
            <div className="w-10/12 m-auto">
                <div className="mt-10">
                    <div className="flex justify-between">
                        {/* <span className="text-sm text-gray-300">{visibleJobs.length} Jobs</span> */}
                    </div>
                    <div className="grid grid-cols-8 gap-4 pb-16">
                        {filteredUsers.map(user => (<ProfilItem user={user} key={user.id} className="col-span-2" />))}
                    </div>
                </div>
            </div>
        </div>
    );
}
