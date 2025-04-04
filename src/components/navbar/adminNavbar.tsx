"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Briefcase, Home } from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const AdminNavbar = () => {
    const user = useCurrentUser();
    return <div className="text-2xl flex justify-between py-[30px]">
        <Image src={"/kaziUp_white.png"} className="w-[200px] object-cover" alt="kazi up logo" width={200} height={100} />

        <div className="pr-[50px] w-[20%] flex justify-end items-center">
            <Link href={"/admin"} className="text-gray-100 text-[16px] mr-4 underline">
                <Home size={25} />
            </Link>
            <Link href={"/admin/jobs"} className="text-gray-100 text-[16px] mr-4 underline">
                <Briefcase size={25} />
            </Link>
            {!user
                ? (<Link href={"/login"}><Button>Login</Button></Link>)
                : (
                    <Link href={"/profil"}>
                        <Avatar className="size-[35px] bg-[#18CB96] flex justify-center items-center font-bold">
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>)}
        </div>
    </div>
}