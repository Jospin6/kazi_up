type SelectFieldProps = {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    register: any;
    errors: any; 
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; 
    defaultValue?: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, defaultValue, options, register, onChange, errors }) => {
    return (
        <div className="text-gray-300 mb-4">
            <label htmlFor={name} className="block text-sm mb-1 font-medium">{label.toLocaleUpperCase()}</label>
            <select {...register(name)} defaultValue={defaultValue} onChange={onChange} className="border border-gray-700 rounded-lg px-2 w-full h-[40px]" id={name}>
                <option>Choose {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value} className="text-gray-900">
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <span className="text-red-600 text-sm">{errors[name]?.message}</span>}
        </div>
    );
};
