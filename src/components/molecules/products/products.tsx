'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { Product } from '../../../../types/products'
import { getProducts } from '../../../../lib/firestore'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { useEffect, useState } from 'react'

export default function Products({
  translations,
}: {
  translations: Record<string, string>
}) {
  const locale = useLocale()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState<string>('') // State for sorting products
  // const [selectedCategory, setSelectedCategory] = useState<string>('') // State for category filter
  const [selectedOrigin, setSelectedOrigin] = useState<string>('') // State for origin filter
  const [selectedGrape, setSelectedGrape] = useState<string>('') // State for grape  filter
  const [origins, setOrigins] = useState<string[]>([]) // State to store unique origins
  const [grape, setGrape] = useState<string[]>([]) // State to store unique grape types
  const [loading, setLoading] = useState<boolean>(true) // State to store loading state

  useEffect(() => {
    async function fetchProducts() {
      if (locale) {
        setLoading(true)
        const data = await getProducts() // Fetch products from Firestore
        setProducts(data)
        setFilteredProducts(data)

        // Extract unique origins from the products and set them in the state
        const uniqueOrigins = [
          ...new Set(data.map((product) => product.origin)),
        ]
        setOrigins(uniqueOrigins)

        // Extract unique grape types from the products and set them in the state
        const uniquegrapes = [...new Set(data.map((product) => product.grape))]
        setGrape(uniquegrapes)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [locale])

  useEffect(() => {
    let updatedProducts = [...products]

    // // ✅ Filter by category
    // if (selectedCategory) {
    //   updatedProducts = updatedProducts.filter(
    //     (product) =>
    //       product.category?.trim().toLowerCase() ===
    //       selectedCategory.trim().toLowerCase(),
    //   )
    // }

    // ✅ Filter by origin
    if (selectedOrigin) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.origin?.trim().toLowerCase() ===
          selectedOrigin.trim().toLowerCase(),
      )
    }

    // ✅ Filter by grape type
    if (selectedGrape) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.grape?.trim().toLowerCase() ===
          selectedGrape.trim().toLowerCase(),
      )
    }

    // ✅ Sort by price
    if (sortOrder === 'asc') {
      updatedProducts.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (sortOrder === 'desc') {
      updatedProducts.sort((a, b) => Number(b.price) - Number(a.price))
    }

    setFilteredProducts(updatedProducts) // Update the filtered products state
  }, [sortOrder, selectedOrigin, selectedGrape, products])

  return (
    <div className="mx-0 flex flex-col pt-6 lg:mx-20 lg:flex-row lg:pt-24">
      {/* Sidebar */}
      <aside className="w-full pr-0 md:pr-10 lg:w-1/4">
        <h2 className="mb-4 text-lg font-bold">{translations.filters}</h2>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {translations.sort_by_price}
          </label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">{translations.default}</option>
            <option value="asc">{translations.low_to_high}</option>
            <option value="desc">{translations.high_to_low}</option>
          </select>
        </div>

        {/* Category Dropdown
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {translations.category}
          </label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{translations.all_categories}</option>
            <option value="red wine">{translations.red_wine}</option>
            <option value="white wine">{translations.white_wine}</option>
            <option value="sparkling wine">
              {translations.sparkling_wine}
            </option>
          </select>
        </div> */}

        {/* Origin Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {translations.origin}
          </label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
          >
            <option value="">{translations.all_origins}</option>
            {origins.map((origin, index) => (
              <option key={index} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>

        {/* Grape Type Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">
            {translations.grape_type}
          </label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={selectedGrape}
            onChange={(e) => setSelectedGrape(e.target.value)}
          >
            <option value="">{translations.all_grape_types}</option>
            {grape.map((grape, index) => (
              <option key={index} value={grape}>
                {grape}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Product Listing */}
      <div className="flex w-full flex-wrap items-center justify-center gap-20 md:gap-10 lg:w-3/4">
        {loading ? (
          // 🔄 Show spinner when loading
          <div className="flex h-[300px] w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="flex max-w-[100px] transition-all duration-300 ease-in-out hover:scale-105 md:max-w-[200px]"
              key={product.id}
            >
              <Link href={`/${locale}/products/${product.id}`} passHref>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mb-4 h-48 w-full rounded-md object-contain"
                />
                {/* <PoppinsText
                  fontSize="12px"
                  className={`w-fit rounded-full px-3 py-1 text-white ${
                    product.category === 'red wine'
                      ? 'bg-red-500'
                      : product.category === 'white wine'
                        ? 'border bg-gray-300 text-black'
                        : product.category === 'sparkling wine'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                  }`}
                >
                  {product.category}
                </PoppinsText> */}
                <PoppinsText fontSize="14px">{product.name}</PoppinsText>
                <PoppinsText fontSize="14px">{product.price} €</PoppinsText>
                <PoppinsText fontSize="12px" className="text-gray-600">
                  {product.origin} - {product.grape}
                </PoppinsText>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
