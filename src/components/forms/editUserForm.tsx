import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";
import { TextAreaField } from "../ui/textAreaField";

const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    avatar: z.instanceof(File).optional(),
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
        setValue,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserFormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <InputField
                label={"Your Avatar"}
                type="file"
                name={"avatar"}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setValue("avatar", file);
                    }
                }}
                placeholder={"Avatar"}
                register={register}
                errors={errors}
            />
            <InputField
                label={"username"}
                name={"username"}
                placeholder={"Username"}
                register={register}
                errors={errors}
            />

            <InputField
                label={"email"}
                type="email"
                name={"email"}
                placeholder={"Email"}
                register={register}
                errors={errors}
            />

            <TextAreaField
                label={"Bio"}
                name={"bio"}
                placeholder={"bio"}
                register={register}
                errors={errors} />

            <TextAreaField
                label={"skills"}
                name={"skills"}
                placeholder={"Skills"}
                register={register}
                errors={errors} />

            <InputField
                label={"website"}
                name={"website"}
                placeholder={"https://"}
                register={register}
                errors={errors}
            />

            <InputField
                label={"github"}
                name={"github"}
                placeholder={"ex: jospin6"}
                register={register}
                errors={errors}
            />

            <InputField
                label={"X"}
                name={"twitter"}
                placeholder={"ex: jospinndagano1"}
                register={register}
                errors={errors}
            />

            <InputField
                label={"linkedin"}
                name={"linkedin"}
                placeholder={"ex: jospin_ndagano"}
                register={register}
                errors={errors}
            />
            <div className="flex justify-end my-4">
                <Button type="submit">Edit my profil</Button>
            </div>
        </form>
    );
}
