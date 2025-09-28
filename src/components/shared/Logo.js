'use client'

import Link from "next/link";

export default function Logo({ className }) {
  return (
    <Link href="/">
      <div className={`cursor-pointer ${className || ""}`}>
        <h1 className="text-3xl font-bold">
          Auth<span className="font-mono text-gray-600">One</span>
        </h1>
      </div>
    </Link>
  );
}
