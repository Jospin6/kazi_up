"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { InputField } from "../ui/InputField";
import { RichTextField } from "../ui/RichTextField";
import { SelectField } from "../ui/selectField";
import { customStyles } from "@/lib/utils";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createJob } from "@/redux/job/jobSlice";

const Select = dynamic(() => import("react-select"), { ssr: false });

const jobSchema = z.object({
    position: z.string().min(3, "Title must be at least 3 characters"),
    companyName: z.string().optional(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobCategoryId: z.string().optional(),
    employementTypeId: z.string().min(1, "Employment Type is required"),
    primaryTag: z.string().optional(),
    tags: z.string().optional(),
    jobRestricted: z.string().optional(),
    remote: z.string().optional(),
    companyLogo: z.instanceof(File).optional(),
    howToApply: z.string().optional(),
    salaryRange: z.string().optional(),
    website: z.string().optional(),
    userId: z.string().optional()
});
type JobFormValues = z.infer<typeof jobSchema>;

export default function JobForm() {
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
    });

    const availableTags = [
        'React',
        'JavaScript',
        'CSS',
        'HTML',
        'Node.js',
        'Python',
        'Java',
        'C++',
        'Ruby'
    ];

    const locations = [
        'RDCongo',
        'Rwanda',
        'USA',
        'Gabon',
        'France',
        'Egypt',
        'Canada',
        'Mexique',
        'Argentine',
        'Chine'
    ];
    const [tags, setTags] = useState<string[]>([]);
    const [restrictions, setRestrictions] = useState<string[]>([]);

    const tagOptions = availableTags.map((tag) => ({
        label: `${tag}`,
        value: tag,
    }));

    const restrictionsOptions = locations.map((restriction) => ({
        label: `${restriction}`,
        value: restriction,
    }));

    const handleChange = (selectedOption: any) => {
        if (selectedOption && !tags.includes(selectedOption.value) && selectedOption.value.length >= 2) {
            setTags([...tags, selectedOption.value]);
        }
    };

    const handleChangeRestrictions = (selectedOption: any) => {
        if (selectedOption && !restrictions.includes(selectedOption.value) && selectedOption.value.length >= 2) {
            setRestrictions([...restrictions, selectedOption.value]);
        }
    };

    const removeItem = (i: any) => {
        let newTags = tags.filter((_, index) => index !== i)
        setTags([...newTags])
    }

    const removeItemRestriction = (i: any) => {
        let newRestrictions = restrictions.filter((_, index) => index !== i)
        setRestrictions([...newRestrictions])
    }

    const onSubmit = (data: JobFormValues) => {
        const formData = new FormData();
        formData.append("position", data.position);
        if (data.companyName) formData.append("companyName", data.companyName);
        formData.append("description", data.description);
        if (data.jobCategoryId) formData.append("jobCategoryId", data.jobCategoryId);
        formData.append("employementTypeId", data.employementTypeId);
        if (data.primaryTag) formData.append("primaryTag", data.primaryTag);
        if (data.tags) formData.append("tags", data.tags);
        if (data.jobRestricted) formData.append("jobRestricted", data.jobRestricted);
        if (data.remote) formData.append("remote", data.remote);
        if (data.howToApply) formData.append("howToApply", data.howToApply);
        if (data.salaryRange) formData.append("salaryRange", data.salaryRange);
        if (data.website) formData.append("howToApply", data.website);

        if (data.companyLogo) {
            formData.append("companyLogo", data.companyLogo);
          } else {
            console.error("Aucun fichier sélectionné !");
          }
        dispatch(createJob(formData))
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="border border-gray-700 p-3 rounded-2xl">
                <InputField
                    label={"Job position"}
                    name={"position"}
                    placeholder={"Position"}
                    register={register}
                    errors={errors}
                />

                <InputField
                    label={"company name"}
                    name={"companyName"}
                    placeholder={"Company name"}
                    register={register}
                    errors={errors}
                />

                <RichTextField label={"Description"} control={control} name="description" />

                <SelectField
                    name={"jobCategoryId"}
                    label={"Job Sector"}
                    options={[
                        { value: "Technologie", label: "Technologie" },
                        { value: "Economie", label: "Economie" }]}
                    register={register}
                    errors={errors}
                />

                <SelectField
                    name={"employementType"}
                    label={"Employement Type"}
                    options={[
                        { value: "Full time", label: "Full time" },
                        { value: "Part time", label: "Part time" }]}
                    register={register}
                    errors={errors}
                />

                <SelectField
                    name={"primaryTag"}
                    label={"Primary tag"}
                    options={[
                        { value: "Full time", label: "Full time" },
                        { value: "Part time", label: "Part time" }]}
                    register={register}
                    errors={errors}
                />

                <div className="text-gray-300 mb-4">

                    <label className="block text-sm mb-2 font-medium">{"Keywords, tags".toLocaleUpperCase()}</label>
                    <div className="flex flex-wrap">
                        {
                            tags.map((tag, i) => (
                                <div
                                    className="text-[12px] rounded-2xl mr-2 px-3 py-[3px] flex items-center border border-gray-700 my-2" key={i}>
                                    <span>{tag}</span> <X size={12} className="ml-[3px] cursor-pointer" onClick={() => removeItem(i)} />
                                </div>))
                        }
                    </div>
                    <Select
                        options={tagOptions}
                        onChange={handleChange}
                        onInputChange={handleChange}
                        placeholder="choose tags"
                        isClearable
                        styles={customStyles}
                    />
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">{"Job Restricted".toLocaleUpperCase()}</label>
                    <div className="flex flex-wrap">
                        {
                            restrictions.map((rect, i) => (
                                <div
                                    className="text-[12px] rounded-2xl mr-2 px-3 py-[3px] flex items-center border border-gray-700 my-2" key={i}>
                                    <span>{rect}</span> <X size={12} className="ml-[3px] cursor-pointer" onClick={() => removeItemRestriction(i)} />
                                </div>))
                        }
                    </div>
                    <Select
                        options={restrictionsOptions}
                        onChange={handleChangeRestrictions}
                        onInputChange={handleChangeRestrictions}
                        placeholder="choose location"
                        isClearable
                        styles={customStyles}
                    />
                </div>

                <SelectField
                    name={"remote"}
                    label={"Remote"}
                    options={[
                        { value: "onsite", label: "Onsite" },
                        { value: "hybrid", label: "Hybrid" },
                        { value: "remote", label: "Remote" }]}
                    register={register}
                    errors={errors}
                />
            </div>


            <div className="border border-gray-700 p-3 rounded-2xl mt-4">
                <h1 className="text-center text-[14px] text-gray-300">JOB DETAILS</h1>
                <InputField
                    label={"company logo"}
                    type="file"
                    name={"companyLogo"}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setValue("companyLogo", file);
                        }
                      }}
                    placeholder={"Company logo"}
                    register={register}
                    errors={errors}
                />

                <RichTextField label={"how to apply"} control={control} name="howToApply" />
                <InputField
                    label={"salary"}
                    name={"salaryRange"}
                    placeholder={"Salary range"}
                    register={register}
                    errors={errors}
                />

                <InputField
                    label={"website"}
                    name={"website"}
                    placeholder={"https://"}
                    register={register}
                    errors={errors}
                />

                <div className="text-center text-sm text-gray-300">
                    -- Or --
                </div>

                <InputField
                    label={"apply email"}
                    name={"website"}
                    placeholder={"https://"}
                    register={register}
                    errors={errors}
                />
            </div>

            <div className="flex justify-end my-4">
                <Button type="submit">Apply the Job</Button>
            </div>
        </form>
    );
}