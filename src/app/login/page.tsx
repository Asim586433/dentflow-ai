"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@dentflow.ai");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) { setError("Invalid email or password"); setLoading(false); } 
    else if (res?.ok) { router.push("/dashboard"); router.refresh(); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-600">DentFlow AI</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your practice dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm" placeholder="Email address" />
            <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className="text-xs text-center text-gray-500 border-t pt-4 mt-4">
            <p>Demo Credentials (Pre-filled):</p>
            <p>Admin: admin@dentflow.ai / password123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
