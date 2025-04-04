"use client"
import JobCategoryForm from "@/components/forms/jobCategoryForm";

export default function JobCategories() {
    return <div className="w-8/12 m-auto flex">
        <div className="w-8/12">

        </div>
        <div className="w-4/12">
            <h1 className="text-xl font-semibold mb-4 text-gray-100">New Job Category</h1>
            <JobCategoryForm />
        </div>
    </div>
}