"use client"
import { useForm } from "react-hook-form";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Camera, X } from "lucide-react";
import Select from 'react-select'

const Editor = dynamic(() => import("@tinymce/tinymce-react").then((mod) => mod.Editor), {
    ssr: false,
});

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    salary: z.string().optional(),
    remote: z.string().optional(),
    employementTypeId: z.string().min(1, "Employment Type is required"),
    tags: z.string().min(1, "Tags are required"),
    keywords: z.string().min(1, "Keywords are required"),
    companyId: z.string().min(1, "Company is required"),
    postedById: z.string().min(1, "Posted By is required"),
    jobCategoryId: z.string().min(1, "Job Category is required"),
    name: z.string().optional(),
    employement_type: z.string().optional(),
    job_restricted: z.string().optional(),
    apply_email: z.string().optional(),
    website: z.string().optional(),
    logo: z.string().optional(),
    job_sector: z.string().optional(),
});
type JobFormValues = z.infer<typeof jobSchema>;

export default function JobForm() {
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
    const [tags, setTags] = useState<string[]>([]);
    const handleInputChange = (value: string) => {
        // setTags([...tags, value]);
    };


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

    const tagOptions = availableTags.map((tag) => ({
        label: `${tag}`,
        value: tag,
    }));

    const handleChange = (selectedOption: any) => {
        if (selectedOption && !tags.includes(selectedOption.value) && selectedOption.value.length >= 2) {
            setTags([...tags, selectedOption.value]);   
        }
    };

    const removeItem = (i: any) => {
        let newTags = tags.filter((_, index) => index !== i )
        setTags([...newTags])
    }

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderColor: 'lightgray',
            boxShadow: 'none',
            '&:hover': {
                borderColor: 'blue',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'blue' : state.isFocused ? 'lightgray' : 'white',
            color: state.isSelected ? 'white' : 'black',
        }),
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">


            <div className="border border-gray-700 p-3 rounded-2xl">

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Position</label>
                    <input {...register("title")} placeholder="Position" className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-[12px] font-medium">COMPANY NAME</label>
                    <input {...register("name")} placeholder="Company name" className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Description</label>
                    <Editor
                        apiKey='yhg1lt3xy8nbv42slt60rarcifk8dwhj5hjax3fov0nnpiji'
                        init={{
                            plugins: [
                                // Core editing features
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'lists', 'searchreplace', 'wordcount',
                                // Your account includes a free trial of TinyMCE premium features
                                // Try the most popular premium features until Apr 15, 2025:
                                // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | bold italic underline strikethrough | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            menubar: '',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                        }}
                        initialValue="Job description!"
                    />
                </div>


                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Job Sector</label>
                    <select {...register("job_sector")} className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" id="">
                        <option value="">Technologie</option>
                        <option value="">Economie</option>
                    </select>
                    {errors.job_sector && <p className="text-red-500 text-sm">{errors.job_sector.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Employement Type</label>
                    <select {...register("employement_type")} className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" id="">
                        <option value="">Full time</option>
                        <option value="">Part time</option>
                    </select>
                    {errors.employement_type && <p className="text-red-500 text-sm">{errors.employement_type.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Primary tag</label>
                    <select {...register("employement_type")} className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" id="">
                        <option value="">Full stack</option>
                        <option value="">Web dev</option>
                    </select>
                    {errors.employement_type && <p className="text-red-500 text-sm">{errors.employement_type.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">

                    <label className="block text-sm mb-2 font-medium">Keywords, tags</label>
                    <div className="flex flex-wrap">
                        {
                            tags.map((tag, i) => (
                            <div 
                                className="text-[12px] rounded-2xl mr-2 px-3 py-[3px] flex items-center border border-gray-700 my-2" key={i}>
                                    <span>{tag}</span> <X size={12} className="ml-[3px] cursor-pointer" onClick={() => removeItem(i)}/>
                            </div>))
                        }
                    </div>
                    <Select
                        options={tagOptions}
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        placeholder="choose tags"
                        isClearable
                        styles={customStyles}
                    />
                </div>

                <div className="text-gray-300 mb-4">
                    <div className="">
                        Restricted
                    </div>
                    <label className="block text-sm mb-2 font-medium">Job Restricted</label>
                    <select {...register("job_restricted")} className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" id="">
                        <option value="">RDCongo</option>
                        <option value="">USA</option>
                    </select>
                    {errors.job_restricted && <p className="text-red-500 text-sm">{errors.job_restricted.message}</p>}
                </div>

                <div className="text-gray-300 mb-4">
                    <div className="">
                        Remote
                    </div>
                    <label className="block text-sm mb-2 font-medium">Remote</label>
                    <select {...register("remote")} className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" id="">
                        <option value="">Onsite</option>
                        <option value="">Hybrid</option>
                        <option value="">Remote</option>
                    </select>
                    {errors.remote && <p className="text-red-500 text-sm">{errors.remote.message}</p>}
                </div>


            </div>













            <div className="border border-gray-700 p-3 rounded-2xl mt-4">
                <h1 className="text-center text-[14px] text-gray-300">JOB DETAILS</h1>
                <div className="block text-[12px] font-medium text-gray-300">COMPANY LOGO</div>
                <div className="text-gray-300 mb-4">
                    <label htmlFor="companyImg" className="h-[100px] w-[100px] rounded-full border border-gray-700 flex justify-center items-center text-sm mb-2 font-medium">
                        <Camera size={40} className="text-gray-600" />
                    </label>
                    <input type="file" {...register("logo")} id="companyImg" className="w-full hidden h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-[12px] font-medium">HOW TO APPLY?</label>
                    <Editor
                        apiKey='yhg1lt3xy8nbv42slt60rarcifk8dwhj5hjax3fov0nnpiji'
                        init={{
                            plugins: [
                                // Core editing features
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'lists', 'searchreplace', 'wordcount',
                                // Your account includes a free trial of TinyMCE premium features
                                // Try the most popular premium features until Apr 15, 2025:
                                // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                            ],
                            toolbar: 'undo redo | bold italic underline strikethrough |  spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            menubar: '',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                        }}
                    />
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-sm mb-2 font-medium">Salary</label>
                    <input {...register("salary")} placeholder="Salary" className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-[12px] font-medium">APPLY URL</label>
                    <input {...register("website")} placeholder="https://" className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                </div>

                <div className="text-center text-sm text-gray-300">
                    -- Or --
                </div>

                <div className="text-gray-300 mb-4">
                    <label className="block text-[12px] font-medium">APPLY EMAIL ADDRESS</label>
                    <input {...register("apply_email")} placeholder="Email" className="w-full h-[35px] mt-1 p-2 border border-gray-700 rounded-md" />
                </div>

            </div>

            <div className="flex justify-end my-4">
                <Button type="submit">Apply the Job</Button>
            </div>
        </form>
    );
}