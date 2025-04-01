import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().optional(),
    accountType: z.enum(["EMPLOYEE", "COMPANY"]).default("EMPLOYEE"),
    role: z.enum(["USER", "ADMIN", "SUPERADMIN"]).default("USER"),
    avatar: z.string().optional(),
    location: z.string().optional(),
    residencyCountry: z.string().optional(),
    nationality: z.string().optional(),
    gender: z.string().optional(),
    website: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    bio: z.string().optional(),
    skills: z.string().optional(),
    languages: z.string().optional(),
    available: z.string().optional(),
    timezone: z.string().optional(),
    annualpay: z.string().optional(),
    hourlypay: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function EditUserForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserFormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input {...register("username")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" {...register("email")} className="w-full mt-1 p-2 border rounded-md" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea {...register("bio")} className="w-full mt-1 p-2 border rounded-md" rows={4}></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input {...register("website")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input {...register("github")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Twitter</label>
                <input {...register("twitter")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input {...register("linkedin")} className="w-full mt-1 p-2 border rounded-md" />
            </div>

            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
        </form>
    );
}
