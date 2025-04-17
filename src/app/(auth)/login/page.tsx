"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { login } from "@/redux/auth/authSlice";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/InputField";

const schema = z.object({
  email: z.string().email("Invalide email"),
  password: z.string().min(6, "Short password"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const dispatch = useDispatch<AppDispatch>();

  const [error, setError] = useState("");

  const onSubmit = async (data: any) => {
    setError("");

    try {
      const response = await dispatch(login(data)).unwrap();
      if (response.data.message) {
        setError(response.data.message);
        return
      }
    } catch (error) {
      console.log("Error connexion :", error);
    }
    redirect("/");
  };

  return (
    <div className="w-8/12 mx-auto p-6 border border-gray-700 shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label={"Email"}
          type="email"
          name={"email"}
          placeholder={"Email"}
          register={register}
          errors={errors}
        />
        <InputField
          label={"Password"}
          type="password"
          name={"password"}
          placeholder={"Password"}
          register={register}
          errors={errors}
        />
        <Button className="w-4/12">{isSubmitting ? "Connexion..." : "Login"}</Button>
      </form>
      <div className="mt-4 flex text-sm justify-center">
        <span className="pr-2 text-gray-300">Don't have an account?</span>
        <Link href="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </div>
    </div>
  );
}
