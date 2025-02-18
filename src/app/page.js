"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/ticket-selection");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 text-center">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-wide shadow-lg">
        Techember Fest '25
      </h1>
    </div>
  );
}
