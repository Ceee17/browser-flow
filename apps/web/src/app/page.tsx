"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("bf_access_token") : null;

  useEffect(() => {
    if (token) router.replace("/dashboard");
    else router.replace("/login");
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-slate-500">Redirecting...</p>
    </div>
  );
}
