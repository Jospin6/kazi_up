"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link"; import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { redirect } from "next/navigation";
import { signup } from "@/redux/auth/authSlice";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
;

const schema = z.object({
  username: z.string().min(3, "Short name"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Short password"),
});

type signupFormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupFormData>({ resolver: zodResolver(schema) });

  const [error, setError] = useState("");

  const onSubmit = async (data: signupFormData) => {
    setError("");
    try {
      const response = await dispatch(signup(data)).unwrap();
      if (response.data.message) {
        setError(response.data.message);
        return
      }
    } catch (error) {
      console.error("Error connexion :", error);
    }
    redirect("/");
  };

  return (
    <div className="w-8/12 mx-auto p-6 border border-gray-700 shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={"username"}
          name={"username"}
          placeholder={"Username"}
          register={register}
          errors={errors}
        />
        <InputField
          label={"email"}
          name={"email"}
          type="email"
          placeholder={"Email"}
          register={register}
          errors={errors}
        />
        <InputField
          label={"password"}
          type="password"
          name={"password"}
          placeholder={"Password"}
          register={register}
          errors={errors}
        />
        <Button className="w-4/12">{isSubmitting ? "Loading..." : "Signup"}</Button>
      </form>
      <div className="mt-4 flex text-sm justify-center">
        <span className="pr-2 text-gray-300">Already have an account?</span>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
