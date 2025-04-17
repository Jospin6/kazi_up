"use client"
import EditUserForm from "@/components/forms/editUserForm";
import EducationForm from "@/components/forms/educationForm";
import ExperienceForm from "@/components/forms/experienceForm";
import ProjectForm from "@/components/forms/projectForm";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/redux/store"
import { getUser, selectUser } from "@/redux/user/userSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Edit() {
    const dispatch = useDispatch<AppDispatch>()
    const currentUser = useCurrentUser()
    const [isAddExperienceOpen, setAddExperienceOpen] = useState<boolean>(false)
    const [isAddProjectOpen, setAddProjectOpen] = useState<boolean>(false)
    const [isAddEducationOpen, setAddEducationOpen] = useState<boolean>(false)

    const handleAddExperience = () => setAddExperienceOpen(!isAddExperienceOpen)
    const handleAddProject = () => setAddProjectOpen(!isAddProjectOpen)
    const handleAddEducation = () => setAddEducationOpen(!isAddEducationOpen)
    const user = useSelector(selectUser)

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getUser(currentUser.id));
        }
    }, [currentUser?.id, dispatch]);

    const experiences = user ? user.UserActivity?.filter(experience => experience.type === "EXPERIENCE") : []
    const educations = user ? user.UserActivity?.filter(education => education.type === "EDUCATION") : []
    const projects = user ? user.UserActivity?.filter(project => project.type === "SIDE_PROJECT") : []

    return <div className="w-10/12 m-auto">
        <div className="w-full px-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">Edit your profil</h1>
            <div>
                {user && (<EditUserForm user={user} />)}
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Experiences</h1>
                <div className="pb-4 w-full mb-3">
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

                    <Button onClick={handleAddExperience}>Add Experience</Button>
                </div>
                {isAddExperienceOpen && (<ExperienceForm />)}
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Educations</h1>
                <div className="pb-4 w-full mb-3">
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
                    <Button onClick={handleAddProject}>Add Projects</Button>
                </div>
                {isAddProjectOpen && (<ProjectForm />)}
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Projects</h1>
                <div className="pb-4 w-full mb-3">
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
                    <Button onClick={handleAddEducation}>Add Education</Button>
                </div>
                {isAddEducationOpen && (<EducationForm />)}
            </div>
        </div>
        <div className="w-4/12"></div>
    </div>

}