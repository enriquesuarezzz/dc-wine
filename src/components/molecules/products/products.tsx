'use client'
import { useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { Product } from '../../../../types/products'
import { getProducts } from '../../../../lib/firestore'
import { PoppinsText } from '@/components/atoms/poppins_text'

export default function Products() {
  const locale = useLocale() // Get the active locale
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      if (locale) {
        const data = await getProducts(locale)
        setProducts(data)
      }
    }
    fetchProducts()
  }, [locale]) // Refetch products when locale changes

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'red wine':
      case 'vino tinto':
        return 'bg-red-800'
      case 'white wine':
      case 'vino blanco':
        return 'bg-amber-200'
      case 'sparkling wine':
      case 'vino espumoso':
        return 'bg-orange-400'
      default:
        return 'bg-gray-500' // Default color for unknown categories
    }
  }

  return (
    <div className="mx-20 flex justify-center pt-24">
      <div className="flex flex-wrap justify-center gap-10">
        {products.map((product) => (
          <div
            className="flex max-w-[600px] flex-col transition-all duration-300 ease-in-out hover:scale-105"
            key={product.id}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mb-4 h-48 w-full rounded-md object-contain"
            />
            {/* Category with dynamic background color */}
            <PoppinsText
              fontSize="12px"
              className={`w-fit rounded-full px-3 py-1 text-white ${getCategoryColor(product.category)}`}
            >
              {product.category}
            </PoppinsText>
            <PoppinsText fontSize="14px">{product.name}</PoppinsText>
            <PoppinsText fontSize="14px">{product.price}</PoppinsText>
          </div>
        ))}
      </div>
    </div>
  )
}
