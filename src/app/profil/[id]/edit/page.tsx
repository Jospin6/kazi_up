import EditUserForm from "@/components/forms/editUserForm";
import { AppDispatch } from "@/redux/store"
import { getUser, selectUser } from "@/redux/user/userSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Edit () {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectUser)
    
    useEffect(() => {
        dispatch(getUser(""))
    }, [])
    return <div>
        <h1>Edit your profil</h1>
        <div>
            <EditUserForm/>
        </div>
        <div>
            EXPERIENCES
        </div>
        <div>
            PROJECTS
        </div>
        <div>
            EDICATION
        </div>
    </div>
}