import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
    return <div className="text-2xl flex justify-between py-[30px]">
        <Image src={"/kaziUp_white.png"} className="w-[200px] object-cover" alt="kazi up logo" width={200} height={100} />

        <div className="pr-[50px] w-[20%] flex justify-end items-center">
            <Link href={"/jobs/new"} className="text-gray-100 text-[16px] mr-4 underline">Post a job</Link>
            <Button>Login</Button>
        </div>
    </div>
}