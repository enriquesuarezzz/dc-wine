'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { getProductById } from '../../../../../lib/firestore'
import { Product } from '../../../../../types/products'

export default function ProductDetails() {
  const pathname = usePathname() // Get the current URL path
  const locale = useLocale()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const pathParts = pathname.split('/') // Extract the product ID
      const productId = pathParts[pathParts.length - 1] // Get last part of URL

      if (productId && locale) {
        const fetchedProduct = await getProductById(productId, locale)
        setProduct(fetchedProduct)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [pathname, locale])

  if (loading) return <p>Loading...</p>
  if (!product) return <p>Product not found</p>

  return (
    <div className="flex flex-col items-center pt-24">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="mb-6 h-64 w-64 rounded-md object-contain"
      />
      <PoppinsText fontSize="16px" className="font-bold">
        {product.name}
      </PoppinsText>
      <PoppinsText fontSize="16px">{product.category}</PoppinsText>
      <PoppinsText fontSize="16px">{product.price}€</PoppinsText>
    </div>
  )
}
