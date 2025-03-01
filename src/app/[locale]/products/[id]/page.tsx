'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { getProductById } from '../../../../../lib/firestore'
import { Product } from '../../../../../types/products'
import { useCart } from '@/components/molecules/cart_context/cart_context'

export default function ProductDetails() {
  const pathname = usePathname()
  const locale = useLocale()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchProduct() {
      const pathParts = pathname.split('/')
      const productId = pathParts[pathParts.length - 1]

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

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      })
    }
  }

  return (
    <div className="flex flex-col items-center pt-24 lg:flex-row lg:justify-between lg:gap-10 lg:px-24">
      {/* Left Section - Product Name & Characteristics */}
      <div className="lg:w-1/3">
        <PoppinsText fontSize="16px" className="font-bold">
          {product.name}
        </PoppinsText>
        <PoppinsText fontSize="16px">Category: {product.category}</PoppinsText>
        <PoppinsText fontSize="16px">Alcohol: {product.alcohol}%</PoppinsText>
        <PoppinsText fontSize="16px">Cellar: {product.cellar}</PoppinsText>
        <PoppinsText fontSize="16px">Grape: {product.grape}</PoppinsText>
        <PoppinsText fontSize="16px">Origin: {product.origin}</PoppinsText>
        <PoppinsText fontSize="16px">Size: {product.size}L</PoppinsText>
      </div>

      {/* Center Section - Product Image */}
      <div className="flex justify-center lg:w-1/3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-64 w-64 rounded-md object-contain"
        />
      </div>

      {/* Right Section - Price & Quantity Selector */}
      <div className="flex flex-col items-center lg:w-1/3">
        <PoppinsText fontSize="20px" className="font-bold">
          {product.price}€
        </PoppinsText>
        {/* Quantity Selector */}
        <div className="col-span-4 flex flex-col items-center gap-1 md:gap-2">
          <div className="flex items-center gap-2">
            <button
              className="rounded bg-gray-300 px-2 py-1 text-black hover:bg-gray-400"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <PoppinsText fontSize="16px">{quantity}</PoppinsText>
            <button
              className="rounded bg-gray-300 px-2 py-1 text-black hover:bg-gray-400"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-md bg-gold/80 px-4 py-2 text-white hover:bg-gold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
