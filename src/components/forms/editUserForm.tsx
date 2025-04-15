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
import { useTranslation } from 'react-i18next'
import { EditUserItem } from "../ui/editUserItem";

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

export default function EditUserForm({ user }: { user: User }) {
    const { t } = useTranslation()
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

            <EditUserItem title={"Profile photo"} subTitle="Please set a real full-color profile photo (not black and white) of just your face. Please smile :)">
                <div className="flex items-center">
                    <InputField
                        label={""}
                        type="file"
                        name={"avatar"}
                        onChange={handleAvatarChange}
                        placeholder={"avatar"}
                        register={register}
                        errors={errors}
                    />
                    {logoPreview && (
                        <div className="w-[150px] h-[150px] ml-4 rounded overflow-hidden">
                            <img src={logoPreview} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                    {avatarUrl && (
                        <img src={avatarUrl} alt="Avatar" className="ml-4" width={150} height={150} />
                    )}
                </div>
            </EditUserItem>

            <EditUserItem title={t("username")} subTitle="">
                <InputField
                    label=""
                    name={"username"}
                    className="w-2/4"
                    placeholder={t("username")}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("email")}>
                <InputField
                    label=""
                    type="email"
                    className="w-2/4"
                    name={"email"}
                    placeholder={t("email")}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>


            <EditUserItem title={t("location")} subTitle="In which country are you staying now? This helps us connect you to other remote workers there.">
                <div className="w-2/4">
                    <Select
                        options={countriesOptions}
                        value={countriesOptions.find((opt) => opt.value === location)}
                        onChange={handleLocationChange}
                        placeholder={t("location")}
                        isClearable
                        styles={customStyles}
                    />
                </div>
            </EditUserItem>

            <EditUserItem title={t("residency")} subTitle="What's your current legal country of residence? This is the country you're legally registered as a resident at the city or country government. If you don't have one now, use your last known. This is important for employers.">
                <div className="w-2/4">
                    <Select
                        options={countriesOptions}
                        onChange={handleResidencyCountryChange}
                        value={countriesOptions.find((opt) => opt.value === residencyCountry)}
                        placeholder={t("residency")}
                        isClearable
                        styles={customStyles}
                    />
                </div>
            </EditUserItem>

            <EditUserItem title={t("nationality")} subTitle="What's the country in your passport? If you have multiple, use the primary. This is important for employers.">
                <div className="w-2/4">
                    <Select
                        options={countriesOptions}
                        value={countriesOptions.find((opt) => opt.value === nationality)}
                        onChange={handleNationalityChange}
                        placeholder={t("nationality")}
                        isClearable
                        styles={customStyles}
                    />
                </div>
            </EditUserItem>

            <EditUserItem title={t("gender")}>
                <div className="w-2/4">
                    <SelectField
                        name={"gender"}
                        label=""
                        defaultValue={user?.gender}
                        options={[
                            { value: "male", label: "Male" },
                            { value: "femal", label: "Femal" }]}
                        register={register}
                        errors={errors}
                    />
                </div>
            </EditUserItem>
            <EditUserItem title={t("bio")}>
                <TextAreaField
                    label=""
                    name={"bio"}
                    className="w-2/4"
                    placeholder={t("bio")}
                    register={register}
                    errors={errors} />
            </EditUserItem>

            <EditUserItem title={t("skills")} subTitle="Use tags like react, js, html, ux, ui, customer support, marketing, front end, backend, office365, excel etc. The more/better tags you use the more you show up on the site! See the Remote OK jobs pages for example tags in your field to add here.">
                <TextAreaField
                    label=""
                    name={"skills"}
                    placeholder={t("skills")}
                    register={register}
                    errors={errors} />
            </EditUserItem>


            <EditUserItem title={t("website")}>
                <InputField
                    label=""
                    className="w-2/4"
                    name={"website"}
                    placeholder={"https://"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("github")}>
                <InputField
                    label=""
                    name={"github"}
                    className="w-2/4"
                    placeholder={"ex: jospin6"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>


            <EditUserItem title={t("x")}>
                <InputField
                    label=""
                    name={"twitter"}
                    className="w-2/4"
                    placeholder={"ex: jospinndagano"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("linkedin")}>
                <InputField
                    label=""
                    name={"linkedin"}
                    className="w-2/4"
                    placeholder={"ex: jospin_ndagano"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("languages")}>
                <InputField
                    label=""
                    name={"languages"}
                    className="w-2/4"
                    placeholder={"ex: English, French"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("available")} subTitle="You'll only be able to receive job offers and get contacted if you're set to available.">
                <InputField
                    label=""
                    name={"available"}
                    className="w-2/4"
                    placeholder={"ex: 2023-10-10"}
                    type="date"
                    register={register}
                    errors={errors}
                />
            </EditUserItem>


            <EditUserItem title={t("timezone")}>
                <InputField
                    label=""
                    name={"timezone"}
                    className="w-2/4"
                    placeholder={"Ex: +1, +2, +4"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>

            <EditUserItem title={t("annualpay")}>
                <InputField
                    label=""
                    name={"annualpay"}
                    className="w-2/4"
                    placeholder={"Ex: 30000"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>
            <EditUserItem title={t("hourlypay")}>
                <InputField
                    label=""
                    name={"hourlypay"}
                    className="w-2/4"
                    placeholder={"Ex: 15"}
                    register={register}
                    errors={errors}
                />
            </EditUserItem>
            <div className="flex justify-end my-4">
                <Button type="submit">{isSubmitting ? "Loading..." : t("editProfil")}</Button>
            </div>
        </form>
    );
}
