"use client"
import { EmploymentTypeForm } from "@/components/forms/employementTypeForm";
import { fetchEmployementTypes, selectEmployementTypes } from "@/redux/employementType/employementTypeSlice";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployementType() {
    const dispatch = useDispatch<AppDispatch>()
    const employementTypes = useSelector(selectEmployementTypes)

    useEffect(() => {
        dispatch(fetchEmployementTypes())
    }, [dispatch])

    return <div className="w-10/12 m-auto flex">
        <div className="w-8/12 pr-4">
            {employementTypes.map(emp => (
                <Accordion type="single" key={emp.id} collapsible className="text-gray-300 w-full border-b border-gray-700">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> {emp.title} </AccordionTrigger>
                        <AccordionContent>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
        <div className="w-4/12 pl-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">New Employement Type</h1>
            <EmploymentTypeForm />
        </div>
    </div>
}