"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

export const Navbar = () => {
    const user = useCurrentUser();
    return <div className="text-2xl flex justify-between py-[30px]">
        <Link href={"/"}>
            <Image src={"/kaziUp_white.png"} className="w-[200px] object-cover" alt="kazi up logo" width={200} height={100} />
        </Link>

        <div className="pr-[50px] w-[50%] flex justify-end items-center">
            <Link href={"/jobs/new"} className="text-gray-100 text-[16px] block mr-4 underline">Post a job</Link>
            <Link href={"/admin"} className="text-gray-100 text-[16px] block mr-4 underline">Admin</Link>
            <Link href={"/profils"} className="text-gray-100 text-[16px] block mr-4 underline">Employers</Link>
            {!user
                ? (<Link href={"/login"}><Button>Login</Button></Link>)
                : (
                    <Link href={"/profil"}>
                        <Avatar className="size-[35px] bg-[#18CB96] flex justify-center items-center font-bold">
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                )}

        </div>
    </div>
}