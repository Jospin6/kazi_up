"use client"
import { EmploymentTypeForm } from "@/components/forms/employementTypeForm";

export default function EmployementType() {
    return <div className="w-8/12 m-auto flex">
        <div className="w-8/12">

        </div>
        <div className="w-4/12">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">New Employement Type</h1>
            <EmploymentTypeForm />
        </div>
    </div>
}