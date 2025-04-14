"use client"
import { User } from "@/redux/user/userSlice"
import { Button } from "./button"
import { SubItem } from "./subItem"
import Image from "next/image"
import { useEffect, useState } from "react"
import { transformStringToArray } from "@/lib/utils"
import { useTranslation } from 'react-i18next'

export const ProfilItem = ({ className, user }: { className: string, user: User }) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { t } = useTranslation()

    useEffect(() => {
        if (user?.id) {
            const imageUrl = `/api/avatar?userId=${user.id}`;
            setAvatarUrl(imageUrl);
        }
    }, [user?.id]);

    return <div className={` bg-gray-900 border-gray-800 mt-2 relative rounded-2xl ${className}`}>
        <div className="h-[250px] rounded-t-2xl">
            {avatarUrl && (
                <Image src={avatarUrl} className="w-[100%] h-[100%] rounded-t-2xl" alt="user avatar image" width={100} height={100} />
            )}
        </div>
        <div className="mb-[45px] p-2">
            <p className="text-[12px] text-gray-300 text-center">
                {user.bio && `${user.bio?.slice(0, 100)}...`}
            </p>
            <div className="flex flex-wrap text-gray-300">
                {user.skills && transformStringToArray(user.skills).map((skill, i) => <SubItem key={i} title={skill} />)}
            </div>
        </div>
        <div className="absolute bottom-1 left-2 right-2 h-[35px]">
            <Button className="bg-green-700 h-[30px] rounded-2xl text-white w-full">{t("avalaibleNow")}</Button>
        </div>
    </div>
}