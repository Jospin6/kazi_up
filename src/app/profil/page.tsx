"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserProfilItem } from "@/components/ui/UserProfilItem"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { AppDispatch } from "@/redux/store"
import { fetchUsers, getUser, selectUser, selectUsers } from "@/redux/user/userSlice"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Users() {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector(selectUser)
    const currentUser = useCurrentUser()

    useEffect(() => {
        if (currentUser) {
            dispatch(getUser(currentUser.id!))   
        }
    }, [currentUser, dispatch])

    return <div className="w-8/12 m-auto">
        <div className="w-full py-2 px-4 h-[150px] flex justify-between rounded-2xl border border-gray-700 text-gray-300">
            <div className="flex items-center">
                <Avatar className="size-[120px] bg-[#18CB96] flex justify-center items-center font-bold">
                    <AvatarFallback className="text-4xl text-black">{currentUser?.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-gray-200 ml-4">
                    <h1 className="text-3xl font-bold">{user?.username}</h1>
                    <h2 className="text-sm">{user?.email}</h2>
                </div>
            </div>
            <div className="flex items-center">
                <Link href={"/profil/edit"}><Button>Edit your profil</Button></Link>
            </div>
        </div>
        <div className="p-4 border border-gray-700 mt-4 rounded-2xl min-h-[100px]">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-200">About</h1>
                <p className="text-start text-gray-400 text-[14px]">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Cupiditate consequatur officia suscipit perferendis blanditiis 
                    corrupti mollitia saepe alias quae repellendus deleniti, placeat 
                    quidem quasi numquam cum, iusto sapiente laboriosam quis.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Cupiditate consequatur officia suscipit perferendis blanditiis 
                    corrupti mollitia saepe alias quae repellendus deleniti, placeat 
                    quidem quasi numquam cum, iusto sapiente laboriosam quis.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Cupiditate consequatur officia suscipit perferendis blanditiis 
                    corrupti mollitia saepe alias quae repellendus deleniti, placeat 
                    quidem quasi numquam cum, iusto sapiente laboriosam quis.
                </p>
            </div>

            <UserProfilItem title="Nationality">
                <div>Congolaise</div>
            </UserProfilItem>
            <UserProfilItem title="Nationality">
                <div>Congolaise</div>
            </UserProfilItem>
            <UserProfilItem title="Nationality">
                <div>Congolaise</div>
            </UserProfilItem>
            <UserProfilItem title="Nationality">
                <div>Congolaise</div>
            </UserProfilItem>

        </div>

        <div className="p-2 border border-gray-700 mt-8 rounded-2xl min-h-[100px]">
            experiences
        </div>

        <div className="p-2 border border-gray-700 mt-8 rounded-2xl min-h-[100px]">
            education
        </div>
        <div className="p-2 border border-gray-700 mt-8 rounded-2xl min-h-[100px]">
            project
        </div>
    </div>
}