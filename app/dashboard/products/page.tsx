"use client";

import Products from "@/app/ui/products";
import { Suspense } from "react";

export default function Page() {
  const products = getProducts();

  async function getProducts() {
    const data = await fetch("https://dummyjson.com/products");
    const { products } = await data.json();
    return products;
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-purple-200 to-blue-200 py-24 px-8">
      <h2 className="mb-6 text-center text-4xl font-semibold">Products</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Products products={products} />
      </Suspense>
    </div>
  );
}
