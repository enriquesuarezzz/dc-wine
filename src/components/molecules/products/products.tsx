'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { Product } from '../../../../types/products'
import { getProducts } from '../../../../lib/firestore'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { useEffect, useState } from 'react'

export default function Products() {
  const locale = useLocale()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [sortOrder, setSortOrder] = useState<string>('') // Sorting order
  const [selectedCategory, setSelectedCategory] = useState<string>('') // Category filter

  useEffect(() => {
    async function fetchProducts() {
      if (locale) {
        const data = await getProducts(locale)
        setProducts(data)
        setFilteredProducts(data) // Initialize with full product list
      }
    }
    fetchProducts()
  }, [locale])

  // Function to filter and sort products
  useEffect(() => {
    let updatedProducts = [...products]

    // Filter by category
    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    }

    // Sort by price
    if (sortOrder === 'asc') {
      updatedProducts.sort((a, b) => Number(a.price) - Number(b.price)) // Ensure price is a number
    } else if (sortOrder === 'desc') {
      updatedProducts.sort((a, b) => Number(b.price) - Number(a.price))
    }

    setFilteredProducts(updatedProducts)
  }, [sortOrder, selectedCategory, products])

  return (
    <div className="mx-20 flex pt-24">
      {/* Sidebar */}
      <aside className="w-1/4 pr-10">
        <h2 className="mb-4 text-lg font-bold">Filters</h2>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Sort by Price</label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            className="mt-1 w-full rounded-md border p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Red Wine">Red Wine</option>
            <option value="White Wine">White Wine</option>
            <option value="Sparkling Wine">Sparkling Wine</option>
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
                  product.category ? `bg-gray-500` : ''
                }`}
              >
                {product.category}
              </PoppinsText>
              <PoppinsText fontSize="14px">{product.name}</PoppinsText>
              <PoppinsText fontSize="14px">{product.price} €</PoppinsText>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
