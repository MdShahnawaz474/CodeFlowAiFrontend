"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Store/AuthContext";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/chat");
    }
  }, [router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(usernameOrEmail, password);
      router.replace("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl py-3 font-semibold text-white transition"
        >
          <span>{loading ? "Logging in..." : "Login"}</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don&apos;t have an account?&nbsp;
          <a
            href="/auth/signup"
            className="text-purple-400 hover:text-purple-600 font-semibold"
          >
            Create one here
          </a>
        </p>
      </form>
    </div>
  );
}
