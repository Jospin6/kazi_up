import { AppDispatch } from "@/redux/store"
import { fetchUsers, selectUsers } from "@/redux/user/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Users () {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector(selectUsers)
    
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return <div>
        <h1>User profile</h1>
    </div>
}