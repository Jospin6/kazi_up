"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserProfilItem } from "@/components/ui/UserProfilItem"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { AppDispatch } from "@/redux/store"
import { fetchUsers, getUser, selectUser, selectUsers } from "@/redux/user/userSlice"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"

export default function Users() {
    const params = useParams()
    const userId = params.userId
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectUser)
    const currentUser = useCurrentUser()

    const isCurrentUser = user?.id === currentUser?.id

    useEffect(() => {
        if (userId) {
            dispatch(getUser(userId.toString()))
        }
    }, [currentUser, dispatch])

    const experiences = user ? user.UserActivity?.filter(experience => experience.type === "EXPERIENCE") : []
    const educations = user ? user.UserActivity?.filter(education => education.type === "EDUCATION") : []
    const projects = user ? user.UserActivity?.filter(project => project.type === "SIDE_PROJECT") : []

    return <div className="w-8/12 m-auto">
        <div className="w-full py-2 px-4 h-[150px] flex justify-between rounded-2xl border border-gray-700 text-gray-300">
            <div className="flex items-center">
                <Avatar className="size-[120px] bg-[#18CB96] flex justify-center items-center font-bold">
                    <AvatarFallback className="text-4xl text-black">{currentUser?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-gray-200 ml-4">
                    <h1 className="text-3xl font-bold">{user?.username}</h1>
                    <h2 className="text-sm">{user?.email}</h2>
                </div>
            </div>
            {isCurrentUser && (
                <div className="flex items-center">
                    <Link href={`/${userId}/edit`}><Button>Edit your profil</Button></Link>
                </div>
            )}

        </div>
        <div className="p-4 border border-gray-700 mt-4 rounded-2xl min-h-[100px]">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-200">About</h1>
                <p className="text-start text-gray-400 text-[14px]">
                    {user?.bio}
                </p>
            </div>

            <UserProfilItem title="Location">
                <div>{user?.location}</div>
            </UserProfilItem>
            <UserProfilItem title="Residency country">
                <div>{user?.residencyCountry}</div>
            </UserProfilItem>
            <UserProfilItem title="Nationality">
                <div>{user?.nationality}</div>
            </UserProfilItem>
            <UserProfilItem title="Languages">
                <div>{user?.languages}</div>
            </UserProfilItem>

            <UserProfilItem title="Skills">
                <div>{user?.skills}</div>
            </UserProfilItem>

            <UserProfilItem title="Gender">
                <div>{user?.gender}</div>
            </UserProfilItem>
            <UserProfilItem title="LinkedIn">
                <div>{user?.linkedin}</div>
            </UserProfilItem>
            <UserProfilItem title="X">
                <div>{user?.twitter}</div>
            </UserProfilItem>
            <UserProfilItem title="Github">
                <div>{user?.github}</div>
            </UserProfilItem>

            <UserProfilItem title="Website">
                <div>{user?.website}</div>
            </UserProfilItem>
            <UserProfilItem title="Available">
                <div>{user?.available}</div>
            </UserProfilItem>
            <UserProfilItem title="Annualy pay">
                <div>{user?.annualpay}</div>
            </UserProfilItem>
            <UserProfilItem title="Hourly pay">
                <div>{user?.hourlypay}</div>
            </UserProfilItem>

            <UserProfilItem title="Timezone">
                <div>{user?.timezone}</div>
            </UserProfilItem>

        </div>

        <div className="p-2 mt-8 rounded-2xl min-h-[100px]">
            <div className="text-xl text-gray-300">experiences</div>
            <div className="mb-3">
                {experiences?.map(exp => (
                    <Accordion type="single" key={exp.id} collapsible className="text-gray-300 w-full border-b border-gray-700">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <span>{exp.yearStart}-{exp.yearEnd}</span>
                                <span>{exp.title}</span>
                                <span>@{exp.company}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>{exp.description}</div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>

        <div className="p-2 mt-8 rounded-2xl min-h-[100px]">
            <div className="text-xl text-gray-300">education</div>
            <div className="mb-3">
                {educations?.map(educ => (
                    <Accordion type="single" key={educ.id} collapsible className="text-gray-300 w-full border-b border-gray-700">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <span>{educ.yearStart}-{educ.yearEnd}</span>
                                <span>{educ.title}</span>
                                <span>{educ.email}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>{educ.description}</div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}

            </div>
        </div>
        <div className="p-2 mt-8 rounded-2xl min-h-[100px]">
            <div className="text-xl text-gray-300">project</div>
            <div className="mb-3">
                {projects?.map(pr => (
                    <Accordion type="single" key={pr.id} collapsible className="text-gray-300 w-full border-b border-gray-700">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <span>{pr.yearStart}-{pr.yearEnd}</span>
                                <span>{pr.title}</span>
                                <span>{pr.url}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div>{pr.description}</div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    </div>
}