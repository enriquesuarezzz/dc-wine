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
  const [showToast, setShowToast] = useState(false)

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

  // Function to handle adding to cart and showing toast
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      })

      // Show toast notification
      setShowToast(true)

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  return (
    <div className="relative flex flex-col items-center pt-24">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed left-1/2 top-14 z-50 flex w-80 -translate-x-1/2 -translate-y-1/2 items-center rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="h-16 w-16 rounded-md object-contain"
          />
          <div className="ml-4 flex flex-col">
            <p className="w-44 truncate text-sm font-semibold text-gray-900">
              Product Added to cart
            </p>
            <p className="w-44 truncate text-sm font-semibold text-gray-900">
              {product?.name}
            </p>
          </div>
          <p className="ml-auto font-bold text-gray-900">{product?.price}€</p>
        </div>
      )}

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

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 rounded-md bg-gold/80 px-4 py-2 text-white hover:bg-gold"
      >
        Add to Cart
      </button>
    </div>
  )
}
