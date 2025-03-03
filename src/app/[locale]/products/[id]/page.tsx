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

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
        })
      }

      // Show toast notification
      setShowToast(true)

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-32">
      <div className="mx-10 flex max-w-[1400px] items-center justify-center gap-10 lg:gap-32">
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed left-1/2 top-14 z-50 flex w-80 -translate-x-1/2 -translate-y-1/2 items-center rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
            <img
              src={product?.imageUrl}
              alt={product?.name}
              className="h-16 w-16 rounded-md object-contain"
            />
            <div className="ml-4 flex flex-col">
              <PoppinsText fontSize="14px" className="text-gray-900">
                {locale === 'en'
                  ? 'Product Added to cart'
                  : 'Producto añadido al carrito'}
              </PoppinsText>
              <PoppinsText
                fontSize="14px"
                className="font-semibold text-gray-900"
              >
                {product?.name}
              </PoppinsText>
            </div>
            <p className="ml-auto font-bold text-gray-900">{product?.price}€</p>
          </div>
        )}
        {/* Left Section - Product Name & Characteristics */}
        <div className="flex w-full flex-col pt-0 md:w-1/3 md:pt-20">
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
          <PoppinsText fontSize="28px" className="mt-2 font-bold">
            {product.name}
          </PoppinsText>
          <div className="flex flex-col gap-1">
            <PoppinsText fontSize="16px">
              Alcohol: {product.alcohol}
            </PoppinsText>
            <PoppinsText fontSize="16px">
              {locale === 'en'
                ? `Cellar: ${product.cellar}`
                : `Bodega: ${product.cellar}`}
            </PoppinsText>
            <PoppinsText fontSize="16px">
              {locale === 'en'
                ? `Grape: ${product.grape}`
                : `Uva: ${product.grape}`}
            </PoppinsText>
            <PoppinsText fontSize="16px">
              {locale === 'en'
                ? `Origin: ${product.origin}`
                : `Origen: ${product.origin}`}
            </PoppinsText>
            <PoppinsText fontSize="16px">
              {locale === 'en'
                ? `Size: ${product.size}`
                : `Tamaño: ${product.size}`}
            </PoppinsText>
          </div>
        </div>

        {/* Center Section - Product Image */}
        <div className="flex items-center justify-center rounded-lg border border-gray-200 p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:w-1/3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-[200px] rounded-md object-contain md:max-w-[250px] lg:max-h-[250px]"
          />
        </div>

        {/* Right Section - Price & Quantity Selector */}
        <div className="hidden flex-col items-center gap-1 md:flex lg:w-1/3">
          {/* Quantity Selector */}
          <div className="col-span-4 flex flex-col items-center gap-1 md:gap-2">
            <PoppinsText fontSize="16px" className="text-center">
              {locale === 'en' ? 'Select Quantity' : 'Selecciona una cantidad'}
            </PoppinsText>
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
            <PoppinsText fontSize="20px" className="font-bold">
              {product.price}€
            </PoppinsText>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full rounded-md bg-gray-800 px-4 py-2 hover:bg-gray-900"
          >
            <PoppinsText fontSize="16px" className="text-white">
              {locale === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
            </PoppinsText>
          </button>
        </div>
      </div>
      {/* Quantity Selector for mobile */}
      <div className="flex flex-col items-center gap-1 pt-10 md:hidden lg:w-1/3">
        <div className="col-span-4 flex flex-col items-center gap-1 md:gap-2">
          <PoppinsText fontSize="16px" className="text-center">
            {locale === 'en' ? 'Select Quantity' : 'Selecciona una cantidad'}
          </PoppinsText>
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
          <PoppinsText fontSize="20px" className="font-bold">
            {product.price}€
          </PoppinsText>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-md bg-gray-800 px-4 py-2 hover:bg-gray-900"
        >
          <PoppinsText fontSize="16px" className="text-white">
            {locale === 'en' ? 'Add to Cart' : 'Añadir al Carrito'}
          </PoppinsText>
        </button>
      </div>
    </div>
  )
}
