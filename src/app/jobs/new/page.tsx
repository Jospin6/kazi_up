import CompanyForm from "@/components/forms/companyForm";
import JobForm from "@/components/forms/jobForm";

export default function NewJob () {
    return <div>
        <h1>New job</h1>
        <div>
            <JobForm/>
        </div>
        <h1>Company</h1>
        <div>
            <CompanyForm/>
        </div>
    </div>
}