
export const UserProfilItem = ({ title, subTitle, children }: { title: string, subTitle?: string, children: React.ReactNode }) => {
    return <div className="flex border-b border-gray-700 pb-3 m-4 text-gray-300">
        <div className="w-[40%] px-2 text-sm">
            <p className="font-semibold">{title}</p>
            <p className="text-gray-400">{subTitle}</p>
        </div>
        <div className="w-[60%] px-2 text-sm text-gray-400 flex flex-wrap">{children}</div>
    </div>
}