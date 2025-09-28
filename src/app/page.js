import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold">Register Your Account or Log in to your account.</h1>
      <Link className="text-blue-600" href={'/login'}>Log in</Link>
      <p>Or</p>
      <Link className="text-blue-600"  href={'/signup'}>Sign Up</Link>
    </div>
  );
}
