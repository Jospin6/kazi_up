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
import { createUserProject } from "@/redux/user/userSlice";
import { useTranslation } from 'react-i18next'

const userActivitySchema = z.object({
    yearStart: z.string().optional(),
    yearEnd: z.string().optional(),
    title: z.string().optional(),
    company: z.string().optional(),
    url: z.string().url("Invalid URL").optional(),
    email: z.string().email("Invalid email format").optional(),
    description: z.string().optional(),
});

type UserActivityFormValues = z.infer<typeof userActivitySchema>;

export default function ProjectForm() {
    const { t } = useTranslation()
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
            dispatch(createUserProject({
                type: "SIDE_PROJECT",
                userId: user.id ?? "",
                ...data
            }))
            reset()
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                    <InputField
                        label={t("ystart")}
                        name={"yearStart"}
                        placeholder={t("ystart")}
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className="col-span-3">
                    <InputField
                        label={t("yend")}
                        name={"yearEnd"}
                        placeholder={t("yend")}
                        register={register}
                        errors={errors}
                    />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                    <InputField
                        label={t("title")}
                        name={"title"}
                        placeholder={t("title")}
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className="col-span-3">
                    <InputField
                        label={t("url")}
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
                    label={t("description")}
                    name={"description"}
                    placeholder={t("description")}
                    register={register}
                    errors={errors} />
            </div>

            <div className="flex justify-end my-4">
                <Button type="submit">{t("saveProject")}</Button>
            </div>
        </form>
    );
}