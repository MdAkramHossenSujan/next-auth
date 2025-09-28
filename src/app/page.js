'use client';
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  // console.log(session)
  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/login" }); // redirect after sign out
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl rounded-2xl flex flex-col items-center">
        {session?.user ? (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Welcome back, {session.user.name}!
          </h1>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Welcome to <Logo className={'inline-block'} />
            </span>
          
          </div>
        )}

        {session?.user ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-700 text-center">
              You are logged in as <span className="font-semibold">{session.user.email}</span>
            </p>
            <Button onClick={handleLogout} disabled={loading}>
              {loading ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-2 w-full">
            <Link
              href="/login"
            >
              <Button>
                Log In
              </Button>
            </Link>
            <p className="text-gray-500">or</p>
            <Link
              href="/signup"
            >
              <Button variant={'outline'}>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

