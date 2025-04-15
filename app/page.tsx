import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">hello word</h1>
      <Link href="/login">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </Link>
    </div>
  );
}
