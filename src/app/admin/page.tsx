"use client"

import Link from "next/link"

export default function Dashboard() {
    return <div className="w-10/12 m-auto flex">
        <div className="w-9/12 h-80 px-3">

        </div>
        <div className="w-3/12">
            <div className="p-3 rounded-2xl border border-gray-700 shadow-sm shadow-gray-300 text-gray-300">
                <Link href={"/admin/roles"} className="block underline">Roles</Link>
                <Link href={"/admin/jobs"} className="block underline">Jobs</Link>
                <Link href={"/admin/subscriptions"} className="block underline">Subscriptions</Link>
                <Link href={"/admin/job-categories"} className="block underline">Job categories</Link>
                <Link href={"/admin/employement-type"} className="block underline">Employement type</Link>
            </div>
        </div>
    </div>
}