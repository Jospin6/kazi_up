import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { TextAreaField } from "../ui/textAreaField";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createJobCategory } from "@/redux/jobCategory/jobCategorySlice";
import { useTranslation } from 'react-i18next'
 
const jobCategorySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    tags: z.string(),
});

type JobCategoryFormValues = z.infer<typeof jobCategorySchema>;

export default function JobCategoryForm() {
    const { t } = useTranslation()
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<JobCategoryFormValues>({
        resolver: zodResolver(jobCategorySchema),
    });

    const onSubmit = (data: JobCategoryFormValues) => {
        dispatch(createJobCategory(data))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <InputField
                label={t("title")}
                name={"title"}
                placeholder={t("title")}
                register={register}
                errors={errors}
            />
            <TextAreaField
                label={t("tags")}
                name={"tags"}
                placeholder={t("tags")}
                register={register}
                errors={errors} />

            <div className="flex justify-end my-4">
                <Button type="submit">{isSubmitting ? "Loading..." : t("addCategory")}</Button>
            </div>
        </form>
    );
}