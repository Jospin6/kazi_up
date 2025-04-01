import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input {...register("title")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <button type="submit" className="w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700">Submit</button>
        </form>
    );
}
