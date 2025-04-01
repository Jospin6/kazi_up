import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import "@mantine/core/styles.css";

const companySchema = z.object({
    name: z.string().min(3, "Company name must be at least 3 characters"),
    description: z.string().optional(),
    logo: z.string().optional(),
    website: z.string().optional(),
    location: z.string().optional(),
    industry: z.string().optional(),
    foundedYear: z.number().int().positive().optional(),
    employees: z.number().int().positive().optional(),
    ownerId: z.string().min(1, "Owner ID is required"),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanyForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
    });

    const [editorContent, setEditorContent] = useState("");

    const onSubmit = (data: CompanyFormValues) => {
        console.log({ ...data, description: editorContent });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input {...register("name")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <RichTextEditor value={editorContent} onChange={setEditorContent} className="bg-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                <input {...register("logo")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input {...register("website")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input {...register("location")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <input {...register("industry")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Founded Year</label>
                <input type="number" {...register("foundedYear")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
                <input type="number" {...register("employees")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Owner ID</label>
                <input {...register("ownerId")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.ownerId && <p className="text-red-500 text-sm">{errors.ownerId.message}</p>}
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
        </form>
    );
}
