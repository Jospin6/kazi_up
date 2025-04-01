import { AppDispatch } from "@/redux/store"
import { getUser, selectUser } from "@/redux/user/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function User () {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectUser)
    
    useEffect(() => {
        dispatch(getUser(""))
    }, [])

    return <div>
        <h1>User profile</h1>
    </div>
}