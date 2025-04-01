import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function UserActivityForm() {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select {...register("type")} className="w-full mt-1 p-2 border rounded-md">
                    <option value="EXPERIENCE">Experience</option>
                    <option value="EDUCATION">Education</option>
                    <option value="SIDE_PROJECT">Side Project</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Year Start</label>
                <input type="text" {...register("year_start")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Year End</label>
                <input type="text" {...register("year_end")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input {...register("title")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input {...register("company")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <input type="url" {...register("url")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" {...register("email")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea {...register("description")} className="w-full mt-1 p-2 border rounded-md" rows={4}></textarea>
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Activity</button>
        </form>
    );
}