

export const EditUserItem = ({title, subTitle, children}: {title: string, subTitle?: string, children: React.ReactNode}) => {
    return <div className="grid grid-cols-4 border-b border-gray-600 gap-4 py-3 mb-4">
        <div className="col-span-2">
            <div className="text-xl text-gray-300 font-bold">{title}</div>
            <div className="text-sm text-gray-400">{subTitle}</div>
        </div>
        <div className="col-span-2">
            {children}
        </div>
    </div>
}