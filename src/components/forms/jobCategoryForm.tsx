import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input {...register("title")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input {...register("tags")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
        </form>
    );
}