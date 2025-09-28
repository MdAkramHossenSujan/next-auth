"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import Logo from "@/components/shared/Logo";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError("Invalid email or password!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Logo at top center */}
        <div className="mb-8 fixed top-30 flex justify-center">
          <Logo />
        </div>

        {/* Form container */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="********"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-sm text-red-600 font-medium text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

