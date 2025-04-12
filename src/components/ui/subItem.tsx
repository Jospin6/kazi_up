import { X } from "lucide-react"

export const SubItem = (
    {title, isRemovable= false, onClick, className}: 
    {title: string, isRemovable?: boolean, onClick?: any, className?: string}) => {
    return <h4 className={`px-4 py-[3px] text-[12px] rounded-2xl flex items-center border border-gray-700 mt-2 mr-2 ${className}`}>
        <span>{title}</span>
        {isRemovable && (
            <X size={12} className="ml-[3px] cursor-pointer" onClick={onClick} />
        )}
    </h4>
}