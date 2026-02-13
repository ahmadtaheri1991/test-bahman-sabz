"use client";

import Users from "@/app/ui/users";
import { Suspense } from "react";

export default function Page() {
  const users = getUsers();

  async function getUsers() {
    const data = await fetch("https://dummyjson.com/users");
    const { users } = await data.json();
    return users;
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-200 to-blue-200 py-24 px-8">
      <h2 className="mb-6 text-center text-4xl font-semibold">Users</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Users users={users} />
      </Suspense>
    </div>
  );
}
