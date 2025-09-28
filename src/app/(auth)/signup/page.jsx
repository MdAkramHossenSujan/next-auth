"use client";

import SubmitButton from "@/components/shared/SubmitButton";
import submitUsers from "@/lib/userSubmit";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const result = await submitUsers(data);
      if (result?.acknowledged) {
        toast.success("User created successfully!");
        form.reset();
      } else {
        toast.error("Failed to create user.");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while creating user.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Image */}
      <div className="hidden md:flex h-screen md:w-1/2">
        <Image
          src="/horse.jpg"
          alt="Signup Image"
          width={800}
          height={800}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side: Form + Logo */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-gray-50">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Auth Logo</h1>
        </div>

        {/* Form */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="********"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="********"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <SubmitButton content="Register" />
          </form>

          {error && (
            <p className="mt-4 text-sm text-red-600 font-medium text-center">
              {error}
            </p>
          )}
          {message && (
            <p className="mt-4 text-sm text-green-600 font-medium text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
