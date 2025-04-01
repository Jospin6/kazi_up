import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import "@mantine/core/styles.css";

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salary: z.string().optional(),
    location: z.string().optional(),
    remote: z.boolean().default(false),
    employementTypeId: z.string().min(1, "Employment Type is required"),
    tags: z.string().min(1, "Tags are required"),
    keywords: z.string().min(1, "Keywords are required"),
    companyId: z.string().min(1, "Company is required"),
    postedById: z.string().min(1, "Posted By is required"),
    jobCategoryId: z.string().min(1, "Job Category is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function JobForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
    });

    const [editorContent, setEditorContent] = useState("");

    const onSubmit = (data: JobFormValues) => {
        console.log({ ...data, description: editorContent });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input {...register("title")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <RichTextEditor value={editorContent} onChange={setEditorContent} className="bg-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input {...register("salary")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input {...register("location")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div className="flex items-center">
                <input type="checkbox" {...register("remote")} className="mr-2" />
                <label className="text-sm font-medium text-gray-700">Remote</label>
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
        </form>
    );
}