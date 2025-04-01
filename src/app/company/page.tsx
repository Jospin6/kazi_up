import { fetchCompanies, selectCompanies } from "@/redux/company/companySlice"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Companies () {
    const dispatch = useDispatch<AppDispatch>()
    const companies = useSelector(selectCompanies)
    
    useEffect(() => {
        dispatch(fetchCompanies())
    }, [])

    return <div>
        <h1>Companies</h1>
    </div>
}