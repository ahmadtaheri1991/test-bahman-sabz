"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (!response.ok) {
        setErrorMessage(res.message);
        return;
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F9F9FC] min-h-screen">
      <div className="flex flex-col justify-center max-w-[448px] mx-auto py-8">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          Sign in to Socket
        </h1>

        <div
          className={[
            "p-6 bg-white rounded-md",
            "flex flex-col gap-8",
            "shadow-[0px_1px_2px_0px_color-mix(in_srgb,#111128_10%,transparent)]",
          ].join(" ")}
        >
          <form onSubmit={login}>
            <div className="flex flex-col gap-4">
              <div className="text-red-600 text-center">{errorMessage}</div>
              
              <input
                placeholder="Enter your username"
                className={[
                  "h-10 w-full px-3",
                  "rounded-md border border-[#e4e4ee]",
                  "focus:border-2 focus:outline-none focus:border-[#6B46C1]",
                ].join(" ")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                placeholder="Enter your password"
                className={[
                  "h-10 w-full px-3",
                  "rounded-md border border-[#e4e4ee]",
                  "focus:border-2 focus:outline-none focus:border-[#6B46C1]",
                ].join(" ")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="rounded-md cursor-pointer bg-[#6B46C1] text-white h-10 font-semibold"
              >
                {loading ? "..." : "Continue with email"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
