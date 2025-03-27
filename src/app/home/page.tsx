"use client";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "../store/productsApi";
import Link from "next/link";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingProps;
}

interface RatingProps {
  rate: number;
  count: number;
}

const Home = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  // @ts-ignore
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products?.filter(
        (product: ProductProps) => product.category === selectedCategory
      )
    : products;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 sm:p-20 gap-16 bg-gray-100 text-gray-900">
      <section className="w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">Discover the Best Deals</h1>
        <p className="mt-3 text-lg">
          Shop top-rated products at unbeatable prices!
        </p>
        <button className="mt-5 px-6 py-2 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-200 transition">
          Shop Now
        </button>
      </section>

      <section className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Shop by Category</h2>
        {categoriesLoading ? (
          <p className="text-gray-600 mt-4">Loading categories...</p>
        ) : (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              className={`px-6 py-3 rounded-lg shadow-md text-lg capitalize transition ${
                selectedCategory === null
                  ? "bg-blue-500 text-black"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg bg-white shadow-md text-lg capitalize hover:bg-gray-200 transition ${
                  selectedCategory === category
                    ? "bg-blue-500 text-black"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="w-full max-w-6xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold">
          {selectedCategory
            ? `${selectedCategory} Products`
            : "Featured Products"}
        </h2>
        {productsLoading ? (
          <p className="text-gray-600 mt-4">Loading products...</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts?.length ? (
              filteredProducts.map((product: ProductProps) => (
                <div
                  key={product.id}
                  className="p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 mx-auto object-contain"
                  />
                  <h3 className="mt-4 text-lg font-semibold truncate">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-lg font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="block mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <p className="mt-4 text-gray-600">
                No products found for this category.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
