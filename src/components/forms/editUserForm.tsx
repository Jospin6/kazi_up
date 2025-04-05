import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../ui/InputField";
import { Button } from "../ui/button";
import { TextAreaField } from "../ui/textAreaField";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { customStyles } from "@/lib/utils";
import { Label } from "../ui/label";
import { SelectField } from "../ui/selectField";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUser, selectUser, updateUser, User } from "@/redux/user/userSlice";

const Select = dynamic(() => import("react-select"), { ssr: false });

const userSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
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

export default function EditUserForm({user}: {user: User}) {
    const dispatch = useDispatch<AppDispatch>()
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatar(file);  // Mettre à jour l'état du fichier
            const previewUrl = URL.createObjectURL(file);  // Créer un URL de prévisualisation
            setLogoPreview(previewUrl);  // Mettre à jour l'aperçu
        }
    };
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    useEffect(() => {
        if (user?.id) {
            const imageUrl = `/api/avatar?userId=${user.id}`;
            setAvatarUrl(imageUrl);
        }
    }, [user?.id]);


    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: '',
            email: '',
            location: '',
            residencyCountry: '',
            nationality: '',
            gender: '',
            website: '',
            github: '',
            twitter: '',
            linkedin: '',
            bio: '',
            skills: '',
            languages: '',
            available: '',
            timezone: '',
            annualpay: '',
            hourlypay: ''
        }
    });

    useEffect(() => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                location: user.location,
                residencyCountry: user.residencyCountry,
                nationality: user.nationality,
                gender: user.gender,
                website: user.website,
                github: user.github,
                twitter: user.twitter,
                linkedin: user.linkedin,
                bio: user.bio,
                skills: user.skills,
                languages: user.languages,
                available: user.available,
                timezone: user.timezone,
                annualpay: user.annualpay,
                hourlypay: user.hourlypay
            });

            setLocation(user.location);
            setResidencyCountry(user.residencyCountry);
            setNationality(user.nationality);
        }
    }, [user, reset]);

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
        const formData = new FormData();

        if (data.username) formData.append("username", data.username);
        if (data.email) formData.append("email", data.email);

        if (avatar) {
            formData.append("avatar", avatar);
        }

        if (location) formData.append("location", location);
        if (residencyCountry) formData.append("residencyCountry", residencyCountry);
        if (nationality) formData.append("nationality", nationality);

        if (data.gender) formData.append("gender", data.gender);
        if (data.website) formData.append("website", data.website);
        if (data.github) formData.append("github", data.github);
        if (data.twitter) formData.append("twitter", data.twitter);
        if (data.linkedin) formData.append("linkedin", data.linkedin);
        if (data.bio) formData.append("bio", data.bio);
        if (data.skills) formData.append("skills", data.skills);
        if (data.languages) formData.append("languages", data.languages);
        if (data.available) formData.append("available", data.available);
        if (data.timezone) formData.append("timezone", data.timezone);
        if (data.annualpay) formData.append("annualpay", data.annualpay);
        if (data.hourlypay) formData.append("hourlypay", data.hourlypay);

        if (user.id) {
            formData.append("userId", user.id);
        }

        if (user.id) {
            dispatch(updateUser({ id: user.id, formData }));
        }
    };


    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-700 p-3 rounded-2xl">
            <div className="flex items-center">
                <div className="mr-4">
                    <InputField
                        label={"your avatar"}
                        type="file"
                        name={"avatar"}
                        onChange={handleAvatarChange}
                        placeholder={"avatar"}
                        register={register}
                        errors={errors}
                    />
                </div>

                {logoPreview && (
                    <div className="w-[100px] h-[100px] rounded overflow-hidden">
                        <img src={logoPreview} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                )}
                {avatarUrl && (
                    <img src={avatarUrl} alt="Avatar" width={100} height={100} />
                )}
            </div>
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
                    value={countriesOptions.find((opt) => opt.value === location)}
                    onChange={handleLocationChange}
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
                    value={countriesOptions.find((opt) => opt.value === residencyCountry)}
                    placeholder="Residency country"
                    isClearable
                    styles={customStyles}
                />
            </div>

            <div className="mb-4">
                <Label className="text-[12px] text-gray-300 mb-1 font-medium">Nationality</Label>
                <Select
                    options={countriesOptions}
                    value={countriesOptions.find((opt) => opt.value === nationality)}
                    onChange={handleNationalityChange}
                    placeholder="Nationality"
                    isClearable
                    styles={customStyles}
                />
            </div>

            <SelectField
                name={"gender"}
                label={"Gender"}
                defaultValue={user?.gender}
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
                placeholder={"ex: jospinndagano"}
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
                placeholder={"ex: 2023-10-10"}
                type="date"
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
                <Button type="submit">{isSubmitting ? "Loading..." : "Edit my profil"}</Button>
            </div>
        </form>
    );
}
