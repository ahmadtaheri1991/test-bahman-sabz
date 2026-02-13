"use client";
import { use } from "react";
import Image from "next/image";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  company: { title: string };
}

export default function Users({ users }: { users: Promise<User[]> }) {
  const allUsers = use(users);

  return (
    <div className="grid grid-cols-3 gap-9">
      {allUsers.map((user) => (
        <div key={user.id} className="rounded-lg bg-white p-4 pb-6">
          <div className="flex gap-4">
            <Image
              className="rounded-full"
              src={user.image}
              alt="user profile"
              width={48}
              height={48}
            />

            <div className="flex flex-col gap-1">
              <span className="text-[#202039] font-semibold">
                {[user.firstName, user.lastName].join(" ")}
              </span>

              <span className="text-[#4D4D63] text-sm">
                {user.company.title}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
