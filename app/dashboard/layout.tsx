import Link from "next/link";

const items = [
  { title: "کاربران", to: "/dashboard/users" },
  { title: "محصولات", to: "/dashboard/products" },
  { title: "خروج", to: "/login" },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside className="min-h-screen fixed right-0 w-[200px] bg-[#F5F5F9]">
        <div className="flex flex-col gap-2 pt-2">
          {items.map((item) => (
            <Link key={item.to} href={item.to}>
              <div className="bg-blue-300 mx-2 px-3 rounded-md h-10 flex justify-end items-center">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </aside>

      <main className="pr-[200px]">{children}</main>
    </>
  );
}
