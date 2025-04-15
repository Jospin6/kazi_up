"use client"

import JobForm from "@/components/forms/jobForm";
import { useTranslation } from 'react-i18next'

export default function NewJob() {
    const { t } = useTranslation()
    return <div className="w-10/12 m-auto">
        <div className="w-8/12 px-4">
            <div className="text-xl font-semibold mb-4 text-gray-100">{t("newJob")}</div>
            <div>
                <JobForm />
            </div>
        </div>
        <div className="w-4/12"></div>
    </div>
}