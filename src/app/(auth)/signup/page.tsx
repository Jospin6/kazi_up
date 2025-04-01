"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link"; import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { redirect } from "next/navigation";
import { signup } from "@/redux/auth/authSlice";
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
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="text" {...register("username")} className="w-full p-2 border rounded" />
          {errors.username?.message && <p className="text-red-500">{String(errors.username.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" {...register("email")} className="w-full p-2 border rounded" />
          {errors.email?.message && <p className="text-red-500">{String(errors.email.message)}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" {...register("password")} className="w-full p-2 border rounded" />
          {errors.password?.message && <p className="text-red-500">{String(errors.password.message)}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Signup"}
          </button>
        </div>
      </form>
      <div className="mt-4 flex text-sm justify-center">
        <span className="pr-2">Already have an account?</span>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
