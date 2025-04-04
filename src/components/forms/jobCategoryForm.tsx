import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";

const jobCategorySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tags: z.string().optional(),
});

type JobCategoryFormValues = z.infer<typeof jobCategorySchema>;

export default function JobCategoryForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JobCategoryFormValues>({
        resolver: zodResolver(jobCategorySchema),
    });

    const onSubmit = (data: JobCategoryFormValues) => {
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
            <TextAreaField
                label={"tags"}
                name={"tags"}
                placeholder={"Tags"}
                register={register}
                errors={errors} />

            <div className="flex justify-end my-4">
                <Button type="submit">Add category</Button>
            </div>
        </form>
    );
}