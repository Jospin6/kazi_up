import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";
import { TextAreaField } from "../ui/textAreaField";
import { useState } from "react";
import dynamic from "next/dynamic";
import { customStyles } from "@/lib/utils";
import { Label } from "../ui/label";
import { SelectField } from "../ui/selectField";

const Select = dynamic(() => import("react-select"), { ssr: false });

const userSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    avatar: z.instanceof(File).optional(),
    location: z.string().optional(),
    residentcyCountry: z.string().optional(),
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

    const countries = ['RDCongo', 'Rwanda', 'United state', 'France', 'Chine', 'Israel', 'Inde', 'Brasile']

    const [location, setLocation] = useState<string>();
    const handleLocationChange = (selectedOption: any) => setLocation(selectedOption.value)

    const [residencyCountry, setResidencyCountry] = useState<string>();
    const handleResidencyCountryChange = (selectedOption: any) => setResidencyCountry(selectedOption.value)

    const [nationality, setNationality] = useState<string>();
    const handleNationalityChange = (selectedOption: any) => setNationality(selectedOption.value)

    const countriesOptions = countries.map((country) => ({
        label: `${country}`,
        value: country,
    }));

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

            <div className="mb-4">
                <Label className="text-[12px] text-gray-300 mb-1 font-medium">Location</Label>
                <Select
                    options={countriesOptions}
                    onChange={handleLocationChange}
                    onInputChange={handleLocationChange}
                    placeholder="Location"
                    isClearable
                    styles={customStyles}
                />
            </div>

            <div className="mb-4">
                <Label className="text-[12px] text-gray-300 mb-1 font-medium">Residency Country</Label>
                <Select
                    options={countriesOptions}
                    onChange={handleResidencyCountryChange}
                    onInputChange={handleResidencyCountryChange}
                    placeholder="Residency country"
                    isClearable
                    styles={customStyles}
                />
            </div>

            <div className="mb-4">
                <Label className="text-[12px] text-gray-300 mb-1 font-medium">Nationality</Label>
                <Select
                    options={countriesOptions}
                    onChange={handleNationalityChange}
                    onInputChange={handleNationalityChange}
                    placeholder="Nationality"
                    isClearable
                    styles={customStyles}
                />
            </div>

            <SelectField
                name={"gender"}
                label={"Gender"}
                options={[
                    { value: "male", label: "Male" },
                    { value: "femal", label: "Femal" }]}
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

            <InputField
                label={"Languages"}
                name={"languages"}
                placeholder={"ex: English, French"}
                register={register}
                errors={errors}
            />

            <InputField
                label={"available"}
                name={"available"}
                type="date"
                placeholder={""}
                register={register}
                errors={errors}
            />
            <InputField
                label={"timezone"}
                name={"timezone"}
                placeholder={"Ex: +1, +2, +4"}
                register={register}
                errors={errors}
            />
            <InputField
                label={"annual pay"}
                name={"annualpay"}
                placeholder={"Ex: 30000"}
                register={register}
                errors={errors}
            />
            <InputField
                label={"hourly pay"}
                name={"hourlypay"}
                placeholder={"Ex: 15"}
                register={register}
                errors={errors}
            />
            <div className="flex justify-end my-4">
                <Button type="submit">Edit my profil</Button>
            </div>
        </form>
    );
}
