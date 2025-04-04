import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";

const employmentTypeSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
});

type EmploymentTypeFormValues = z.infer<typeof employmentTypeSchema>;

export function EmploymentTypeForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmploymentTypeFormValues>({
        resolver: zodResolver(employmentTypeSchema),
    });

    const onSubmit = (data: EmploymentTypeFormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <InputField
                label={"Title"}
                name={"title"}
                placeholder={"Title"}
                register={register}
                errors={errors}
            />
            <div className="flex justify-end my-4">
                <Button type="submit">Add Employement</Button>
            </div>
        </form>
    );
}
