"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { InputField } from "../ui/InputField";
import { RichTextField } from "../ui/RichTextField";
import { SelectField } from "../ui/selectField";
import { customStyles, transformStringToArray } from "@/lib/utils";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createJob } from "@/redux/job/jobSlice";
import { fetchJobCategories, getJobCategory, selectJobCategories, selectJobCategory } from "@/redux/jobCategory/jobCategorySlice";
import { fetchEmployementTypes, selectEmployementTypes } from "@/redux/employementType/employementTypeSlice";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Select = dynamic(() => import("react-select"), { ssr: false });

const jobSchema = z.object({
    position: z.string().min(3, "Title must be at least 3 characters"),
    companyName: z.string(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    jobCategoryId: z.string().optional(),
    employementTypeId: z.string().min(1, "Employment Type is required"),
    primaryTag: z.string().optional(),
    tags: z.string().optional(),
    jobRestricted: z.string().optional(),
    remote: z.string(),
    companyLogo: z.instanceof(File).optional(),
    howToApply: z.string().optional(),
    salaryRange: z.string().optional(),
    website: z.string().optional(),
    userId: z.string().optional()
});
type JobFormValues = z.infer<typeof jobSchema>;

export default function JobForm() {
    const dispatch = useDispatch<AppDispatch>()
    const jobCategories = useSelector(selectJobCategories)
    const jobCategoryId = useSelector(selectJobCategory)
    const employementTypes = useSelector(selectEmployementTypes)
    const currentUser = useCurrentUser()
    const [activeField, setActiveField] = useState<"website" | "email">("website");
    useEffect(() => {
        dispatch(fetchJobCategories())
        dispatch(fetchEmployementTypes())
    }, [dispatch])

    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
    });

    const availableTags = jobCategoryId ? transformStringToArray(jobCategoryId.tags!) : [];

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
    const [tags, setTags] = useState<string[]>([availableTags && availableTags[0]].filter(Boolean));
    const [restrictions, setRestrictions] = useState<string[]>(["worldwide"]);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

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

    const handleJobCategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        dispatch(getJobCategory(selectedValue))
    };

    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    const onSubmit = (data: JobFormValues) => {
        console.log("hey putain")
        const formData = new FormData();
        formData.append("position", data.position);
        formData.append("companyName", data.companyName);
        formData.append("description", data.description);
        if (data.jobCategoryId) formData.append("jobCategoryId", data.jobCategoryId);
        if (data.primaryTag) formData.append("primaryTag", data.primaryTag);
        formData.append("tags", JSON.stringify(tags));
        formData.append("jobRestricted", JSON.stringify(restrictions));
        if (currentUser) formData.append("userId", currentUser.id!);
        if (data.employementTypeId) formData.append("employementTypeId", data.employementTypeId);
        formData.append("remote", data.remote);
        if (data.howToApply) formData.append("howToApply", data.howToApply);
        if (data.salaryRange) formData.append("salaryRange", data.salaryRange);
        if (data.website) formData.append("website", data.website);

        if (data.companyLogo) {
            formData.append("companyLogo", data.companyLogo);
        } else {
            console.error("Aucun fichier sélectionné !");
        }
        dispatch(createJob(formData))
        reset()
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
                    onChange={handleJobCategoryIdChange}
                    options={[
                        ...jobCategories.map(jobCateg => ({ value: jobCateg.id!, label: jobCateg.title }))
                    ]}
                    register={register}
                    errors={errors}
                />

                <SelectField
                    name={"employementTypeId"}
                    label={"Employement Type"}
                    options={[
                        ...employementTypes.map(emp => ({ value: emp.id!, label: emp.title })),
                    ]}
                    register={register}
                    errors={errors}
                />

                <SelectField
                    name={"primaryTag"}
                    label={"Primary tag"}
                    options={[
                        ...availableTags.map(tag => ({ value: tag, label: tag })),
                    ]}
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


                <div className="flex items-center">
                    <div className="mr-4">
                        <InputField
                            label={"Company Logo"}
                            type="file"
                            name={"companyLogo"}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setValue("companyLogo", file);

                                    // Créer une URL temporaire pour l’aperçu
                                    const previewUrl = URL.createObjectURL(file);
                                    setLogoPreview(previewUrl);
                                }
                            }}
                            placeholder={"Company logo"}
                            register={register}
                            errors={errors}
                        />
                    </div>

                    {logoPreview && (
                        <div className="w-[100px] h-[100px] rounded overflow-hidden">
                            <img src={logoPreview} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                </div>

                <RichTextField label={"how to apply"} control={control} name="howToApply" />
                <InputField
                    label={"salary"}
                    name={"salaryRange"}
                    placeholder={"Salary range"}
                    register={register}
                    errors={errors}
                />

                <div className="space-y-4">
                    {activeField === "website" ? (
                        <InputField
                            label="Website"
                            name="website"
                            placeholder="https://"
                            register={register}
                            errors={errors}
                            onClick={() => setActiveField("email")}
                        />
                    ) : (
                        <InputField
                            label="Apply Email"
                            name="website"
                            placeholder="you@example.com"
                            register={register}
                            errors={errors}
                            onClick={() => setActiveField("website")}
                        />
                    )}

                    <div className="text-center text-sm text-gray-300">-- Or --</div>

                    {activeField !== "website" ? (
                        <button
                            type="button"
                            className="text-blue-500 underline text-sm"
                            onClick={() => setActiveField("website")}
                        >
                            Use website instead
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-blue-500 underline text-sm"
                            onClick={() => setActiveField("email")}
                        >
                            Use email instead
                        </button>
                    )}
                </div>
            </div>

            <div className="flex justify-end my-4">
                <Button type="submit">
                    {isSubmitting ? "Loading..." : "Post the Job"}
                </Button>
            </div>
        </form>
    );
}