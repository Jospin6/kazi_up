import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";

const userActivitySchema = z.object({
    type: z.enum(["EXPERIENCE", "EDUCATION", "SIDE_PROJECT"]),
    year_start: z.string().optional(),
    year_end: z.string().optional(),
    title: z.string().optional(),
    company: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
    email: z.string().email("Invalid email format").optional(),
    description: z.string().optional(),
    userId: z.string(),
});

type UserActivityFormValues = z.infer<typeof userActivitySchema>;

export default function ProjectForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserActivityFormValues>({
        resolver: zodResolver(userActivitySchema),
    });

    const onSubmit = (data: UserActivityFormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                <InputField
                    label={"year start"}
                    name={"year_start"}
                    placeholder={"Year start"}
                    register={register}
                    errors={errors}
                />
                </div>
                <div className="col-span-3">
                <InputField
                    label={"year end"}
                    name={"year_end"}
                    placeholder={"Year end"}
                    register={register}
                    errors={errors}
                />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
                <InputField
                    label={"title"}
                    name={"title"}
                    placeholder={"Title"}
                    register={register}
                    errors={errors}
                />
                </div>
                <div className="col-span-3">
                <InputField
                    label={"url"}
                    name={"url"}
                    placeholder={"https://"}
                    register={register}
                    errors={errors}
                />
                </div>
            </div>
            <div>
            
            </div>
            <div>
                <TextAreaField
                    label={"description"}
                    name={"description"}
                    placeholder={"description"}
                    register={register}
                    errors={errors} />
            </div>

            <div className="flex justify-end my-4">
                <Button type="submit">Save my Experience</Button>
            </div>
        </form>
    );
}