"use client"

import JobForm from "@/components/forms/jobForm";

export default function NewJob() {
    return <div className="w-10/12 m-auto">
        <div className="w-8/12 px-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">New job</h1>
            <div>
                <JobForm />
            </div>
        </div>
        <div className="w-4/12"></div>
    </div>
}