import { Camera } from "lucide-react";
import { Input } from "./input"
import { Label } from "./label"

interface InputFieldProps {
    label: string;
    type?: string;
    name: string;
    placeholder: string;
    register: any;
    errors: any;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ label, onChange, onClick, type, name, placeholder, register, errors, className }) => {
    const imgStyle = "h-[100px] w-[100px] rounded-full border border-gray-700 flex justify-center items-center text-sm mb-2 font-medium"

    return <div className="mb-4" onClick={onClick}>
        <div className={type !== "file" ? "hidden": "text-[12px] text-gray-300 font-semibold mb-2 mt-4"}>{label.toLocaleUpperCase()}</div>
        <Label htmlFor={name} className={type !== "file" 
            ? "block text-[12px] text-gray-300 mb-1 font-medium"
            : imgStyle}>{type !== "file" ? label.toLocaleUpperCase() : <Camera size={40} className="text-gray-600" />}</Label>
        <Input {...register(name)} name={name} onChange={onChange} className={type !== "file" ? className : "hidden"} id={name} placeholder={placeholder} type={type} />
        {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
    </div>
}