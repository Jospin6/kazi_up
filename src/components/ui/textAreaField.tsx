import { Label } from "./label";

interface TextAreaFieldProps {
    label: string;
    name: string;
    placeholder: string;
    register: any;
    errors: any;
    className?: string;
    defaultValue?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({label, name, defaultValue, register, errors, className, placeholder }) => {
    return <div className="mb-4">
        <Label className="block text-[12px] text-gray-300 mb-1 font-medium">{label.toUpperCase()}</Label>
        <textarea {...register(name)} defaultValue={defaultValue} className={`w-full text-gray-300 placeholder:text-gray-400 mt-1 p-2 border rounded-md ${className}`} placeholder={placeholder} rows={4}></textarea>
        {errors[name] && <span className="text-red-600">{errors[name]?.message}</span>}
    </div>
}