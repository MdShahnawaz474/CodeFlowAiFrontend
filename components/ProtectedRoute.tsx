// src/components/ProtectedRoute.tsx
"use client";
import { useAuth } from "@/Store/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  if (!token) return null; // Avoid flicker while redirecting

  return <>{children}</>;
}
