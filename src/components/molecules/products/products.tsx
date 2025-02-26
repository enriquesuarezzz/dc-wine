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
  const [selectedCategory, setSelectedCategory] = useState<string>('') // State for category filter
  const [selectedOrigin, setSelectedOrigin] = useState<string>('') // State for origin filter
  const [selectedGrapeType, setSelectedGrapeType] = useState<string>('') // State for grape type filter
  const [origins, setOrigins] = useState<string[]>([]) // State to store unique origins
  const [grapeTypes, setGrapeTypes] = useState<string[]>([]) // State to store unique grape types

  useEffect(() => {
    async function fetchProducts() {
      if (locale) {
        const data = await getProducts(locale) // Fetch products from Firestore
        setProducts(data)
        setFilteredProducts(data)

        // Extract unique origins from the products and set them in the state
        const uniqueOrigins = [
          ...new Set(data.map((product) => product.origin)),
        ]
        setOrigins(uniqueOrigins)

        // Extract unique grape types from the products and set them in the state
        const uniqueGrapeTypes = [
          ...new Set(data.map((product) => product.grape_type)),
        ]
        setGrapeTypes(uniqueGrapeTypes)
      }
    }
    fetchProducts()
  }, [locale])

  useEffect(() => {
    let updatedProducts = [...products]

    // ✅ Filter by category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category?.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase(),
      )
    }

    // ✅ Filter by origin
    if (selectedOrigin) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.origin?.trim().toLowerCase() ===
          selectedOrigin.trim().toLowerCase(),
      )
    }

    // ✅ Filter by grape type
    if (selectedGrapeType) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.grape_type?.trim().toLowerCase() ===
          selectedGrapeType.trim().toLowerCase(),
      )
    }

    // ✅ Sort by price
    if (sortOrder === 'asc') {
      updatedProducts.sort((a, b) => Number(a.price) - Number(b.price))
    } else if (sortOrder === 'desc') {
      updatedProducts.sort((a, b) => Number(b.price) - Number(a.price))
    }

    setFilteredProducts(updatedProducts) // Update the filtered products state
  }, [sortOrder, selectedCategory, selectedOrigin, selectedGrapeType, products])

  return (
    <div className="mx-20 flex pt-24">
      {/* Sidebar */}
      <aside className="w-1/4 pr-10">
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

        {/* Category Dropdown */}
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
        </div>

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
            value={selectedGrapeType}
            onChange={(e) => setSelectedGrapeType(e.target.value)}
          >
            <option value="">{translations.all_grape_types}</option>
            {grapeTypes.map((grapeType, index) => (
              <option key={index} value={grapeType}>
                {grapeType}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Product Listing */}
      <div className="flex w-3/4 flex-wrap justify-center gap-10">
        {filteredProducts.map((product) => (
          <div
            className="flex max-w-[600px] flex-col transition-all duration-300 ease-in-out hover:scale-105"
            key={product.id}
          >
            <Link href={`/${locale}/products/${product.id}`} passHref>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mb-4 h-48 w-full rounded-md object-contain"
              />
              <PoppinsText
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
              </PoppinsText>
              <PoppinsText fontSize="14px">{product.name}</PoppinsText>
              <PoppinsText fontSize="14px">{product.price} €</PoppinsText>
              <PoppinsText fontSize="12px" className="text-gray-600">
                {product.origin} - {product.grape_type}
              </PoppinsText>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
