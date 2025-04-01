"use client"
import { getCompany, selectCompany } from "@/redux/company/companySlice"
import { AppDispatch } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Company () {
    const dispatch = useDispatch<AppDispatch>()
    const company = useSelector(selectCompany)
    
    useEffect(() => {
        dispatch(getCompany(""))
    }, [])

    return <div>
        <h1>Company</h1>
    </div>
}