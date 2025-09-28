"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginBtn() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center w-full cursor-pointer justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
}
