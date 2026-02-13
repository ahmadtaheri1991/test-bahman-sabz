"use client";
import { use } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
}

export default function Products({
  products,
}: {
  products: Promise<Product[]>;
}) {
  const allProducts = use(products);

  return (
    <div className="grid grid-cols-3 gap-9">
      {allProducts.map((product) => (
        <div
          key={product.id}
          className="rounded-lg bg-white p-4 pb-6 flex flex-col gap-5"
        >
          <div className="flex gap-4">
            <Image
              className="rounded-full"
              src={product.thumbnail}
              alt="product profile"
              width={48}
              height={48}
            />

            <div className="flex flex-col gap-1">
              <span className="text-[#202039] font-semibold">
                {product.title}
              </span>

              <span>${product.price}</span>
            </div>
          </div>

          <span className="text-[#4D4D63] text-sm">{product.description}</span>
        </div>
      ))}
    </div>
  );
}
