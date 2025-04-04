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

export default function Edit() {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectUser)
    const [isAddExperienceOpen, setAddExperienceOpen] = useState<boolean>(false)
    const [isAddProjectOpen, setAddProjectOpen] = useState<boolean>(false)
    const [isAddEducationOpen, setAddEducationOpen] = useState<boolean>(false)

    const handleAddExperience = () => setAddExperienceOpen(!isAddExperienceOpen)
    const handleAddProject = () => setAddProjectOpen(!isAddProjectOpen)
    const handleAddEducation = () => setAddEducationOpen(!isAddEducationOpen)

    useEffect(() => {
        dispatch(getUser(""))
    }, [])
    return <div className="w-10/12 m-auto">
        <div className="w-8/12 px-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">Edit your profil</h1>
            <div>
                <EditUserForm />
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Experiences</h1>
                <div className="pb-4 border-b border-gray-700 w-full mb-3">

                    <Button onClick={handleAddExperience}>Add Experience</Button>
                </div>
                { isAddExperienceOpen && (<ExperienceForm />) }
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Projects</h1>
                <div className="pb-4 border-b border-gray-700 w-full mb-3">
                    <Button onClick={handleAddProject}>Add Projects</Button>
                </div>
                {isAddProjectOpen && (<ProjectForm />)}
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold mb-4 text-gray-100">Educations</h1>
                <div className="pb-4 border-b border-gray-700 w-full mb-3">
                    <Button onClick={handleAddEducation}>Add Education</Button>
                </div>
                {isAddEducationOpen && (<EducationForm />)}
            </div>
        </div>
        <div className="w-4/12"></div>
    </div>

}