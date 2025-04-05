"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { createUserExperience } from "@/redux/user/userSlice";

const userActivitySchema = z.object({
    yearStart: z.string().optional(),
    yearEnd: z.string().optional(),
    company: z.string().optional(),
    title: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
    email: z.string().email("Invalid email format").optional(),
    description: z.string().optional(),
});

type UserActivityFormValues = z.infer<typeof userActivitySchema>;

export default function ExperienceForm() {
    const dispatch = useDispatch<AppDispatch>()
    const user = useCurrentUser()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserActivityFormValues>({
        resolver: zodResolver(userActivitySchema),
    });

    const onSubmit = (data: UserActivityFormValues) => {
        if (user) {
            dispatch(createUserExperience({
                type: "EXPERIENCE",
                userId: user.id ?? "",
                ...data
            }))
            reset()
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                    <InputField
                        label={"year start"}
                        name={"yearStart"}
                        placeholder={"Year start"}
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className="col-span-2">
                <InputField
                    label={"year end"}
                    name={"yearEnd"}
                    placeholder={"Year end"}
                    register={register}
                    errors={errors}
                />
                </div>
                <div className="col-span-2">
                <InputField
                    label={"title"}
                    name={"title"}
                    placeholder={"Title"}
                    register={register}
                    errors={errors}
                />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-2">
                <InputField
                    label={"company"}
                    name={"company"}
                    placeholder={"Company"}
                    register={register}
                    errors={errors}
                />
                </div>
                <div className="col-span-2">
                <InputField
                    label={"email"}
                    name={"email"}
                    placeholder={"Email"}
                    register={register}
                    errors={errors}
                />
                </div>
                <div className="col-span-2">
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