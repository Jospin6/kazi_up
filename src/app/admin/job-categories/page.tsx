"use client"
import JobCategoryForm from "@/components/forms/jobCategoryForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchJobCategories, selectJobCategories } from "@/redux/jobCategory/jobCategorySlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function JobCategories() {
    const dispatch = useDispatch<AppDispatch>()
    const jobCategories = useSelector(selectJobCategories)
    useEffect(() => {
        dispatch(fetchJobCategories())
    }, [])
    return <div className="w-10/12 m-auto flex">
        <div className="w-8/12 pr-4">
            {jobCategories.map(jobcateg => (
                <Accordion type="single" key={jobcateg.id} collapsible className="text-gray-300 w-full border-b border-gray-700">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> {jobcateg.title} </AccordionTrigger>
                        <AccordionContent>
                            <div>{jobcateg.tags}</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
        <div className="w-4/12 pl-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">New Job Category</h1>
            <JobCategoryForm />
        </div>
    </div>
}