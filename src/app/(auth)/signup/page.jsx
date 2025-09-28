"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import submitUsers from "@/lib/userSubmit";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const result = await submitUsers(data);
            if (result?.acknowledged) {
                toast.success("User created successfully!");
                reset();
                setLoading(false);
            } else {
                toast.error("Failed to create user.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while creating user.");
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side: Image */}
            <div className="hidden md:flex md:w-1/2 h-screen">
                <Image
                    src="/horse.jpg"
                    alt="Signup Image"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right side: Form + Logo */}
            <div className="flex flex-1 flex-col items-center justify-center p-8">
                {/* Logo */}
                <Link href={'/'}>
                    <div className="fixed top-20">
                        <h1 className="text-3xl font-bold">Auth<span className="font-mono text-gray-600">One</span></h1>
                    </div>
                </Link>

                {/* Form */}
                <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Register Into Our Page
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Full Name
                            </label>
                            <input
                                {...register("name", { required: "Full name is required" })}
                                type="text"
                                placeholder="Your name"
                                className="w-full rounded-lg border border-gray-400 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Email
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid email address",
                                    },
                                })}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-400 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Password
                            </label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                                })}
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full rounded-lg border border-gray-400 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.password && (
                                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                            )}

                            <div
                                className="absolute right-3 top-7/10 -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-800 mb-1">
                                Confirm Password
                            </label>
                            <input
                                {...register("confirmPassword", { required: "Please confirm your password" })}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full rounded-lg border border-gray-400 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div
                                className="absolute right-3 top-7/10 -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button disabled={loading}>
                            {loading ? 'Creating your account' : 'Register'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
