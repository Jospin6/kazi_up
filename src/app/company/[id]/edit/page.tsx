import CompanyForm from "@/components/forms/companyForm"
import { getCompany, selectCompany } from "@/redux/company/companySlice"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function EditCompany () {

    const dispatch = useDispatch<AppDispatch>()
    const company = useSelector(selectCompany)
    
    useEffect(() => {
        dispatch(getCompany(""))
    }, [])

    return <div>
        <h1>Edit company</h1>
        <div>
            <CompanyForm/>
        </div>
    </div>
}