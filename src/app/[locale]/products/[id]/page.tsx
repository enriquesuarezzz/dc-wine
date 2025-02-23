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
  const { addToCart } = useCart() // Get the addToCart function
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

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

      {/* Add to Cart Button */}
      <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
          })
        }
        className="mt-4 rounded-md bg-gold/80 px-4 py-2 text-white hover:bg-gold"
      >
        Add to Cart
      </button>
    </div>
  )
}
