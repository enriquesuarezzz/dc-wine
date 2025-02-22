'use client'

import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'
import LocaleSwitcher from '../locale_switcher/locale_switcher'
import Cart from '@/components/atoms/svg/cart'
import SearchBar from '../search_bar/search_bar'
import { useCart } from '@/components/molecules/cart_context/cart_context'
import { MobileMenu } from './mobile_navbar'
import { useState } from 'react'
import Delete from '@/components/atoms/svg/delete'

interface NavBarProps {
  translations: {
    home: string
    about_us: string
    products: string
    select_language: string
    search_bar: {
      search_placeholder: string
      no_results: string
    }
    cart: {
      title: string
      empty: string
      remove: string
      quantity: string
    }
  }
}

export default function NavBar({ translations }: NavBarProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, removeFromCart } = useCart()
  const totalPrice = cartItems.reduce((total, item) => {
    console.log(item.price, item.quantity) // Log to see the values
    const price = isNaN(item.price) ? 0 : item.price
    const quantity = isNaN(item.quantity) ? 1 : item.quantity
    return total + price * quantity
  }, 0)

  // Ensure that the total price is a number and round it properly
  const formattedTotalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2)

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between rounded-b-3xl bg-[#f8f7f7] px-6 py-4 text-white md:px-20">
      <img src="/images/logo.avif" alt="Logo" width={50} height={50} />
      <MobileMenu
        translations={{
          home: translations.home,
          about_us: translations.about_us,
          products: translations.products,
          select_language: translations.select_language,
          search_placeholder: translations.search_bar.search_placeholder,
          no_results: translations.search_bar.no_results,
          title: translations.cart.title,
          empty: translations.cart.empty,
          remove: translations.cart.remove,
          quantity: translations.cart.quantity,
        }}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />
      <div className="hidden items-center gap-10 md:flex">
        <Link href="/">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative mx-auto block w-fit text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
          >
            {translations.home}
          </PoppinsText>
        </Link>
        <Link href="/about_us">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative mx-auto block w-fit text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
          >
            {translations.about_us}
          </PoppinsText>
        </Link>
        <Link href="/products">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative mx-auto block w-fit text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
          >
            {translations.products}
          </PoppinsText>
        </Link>
        <SearchBar
          searchPlaceholder={translations.search_bar.search_placeholder}
          noResults={translations.search_bar.no_results}
        />
        <button onClick={() => setIsCartOpen(true)}>
          <Cart />
        </button>
        <LocaleSwitcher />
      </div>

      {/* Cart Summary */}
      {isCartOpen && (
        <div className="fixed right-0 top-0 z-50 h-full w-full max-w-[500px] bg-white text-black shadow-lg transition-transform">
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute right-4 top-4 mt-2 text-lg"
          >
            ✖
          </button>
          <div className="p-4">
            <PoppinsText
              tag="h1"
              fontSize="19px"
              className="mx-auto mt-2 w-fit text-black"
            >
              {translations.cart.title}
            </PoppinsText>

            <hr className="my-3 border-gray-300 lg:my-4" />

            {cartItems.length === 0 ? (
              <PoppinsText tag="h1" fontSize="16px" style="bold">
                {translations.cart.empty}
              </PoppinsText>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b p-2"
                  >
                    {/* Product Image */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      width={25}
                      height={25}
                      className="mr-4 rounded-md"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <PoppinsText tag="h1" fontSize="16px">
                        {item.name}
                      </PoppinsText>
                      <PoppinsText tag="h1" fontSize="16px">
                        {translations.cart.quantity} {item.quantity}
                      </PoppinsText>
                    </div>
                    <div className="gap- flex flex-col items-center justify-center gap-2">
                      <PoppinsText tag="h1" fontSize="16px">
                        {item.price}
                      </PoppinsText>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Delete />
                        <PoppinsText
                          tag="h1"
                          fontSize="16px"
                          className="text-red-500"
                        >
                          {translations.cart.remove}
                        </PoppinsText>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {/* Total Price */}
            <div className="mt-4 flex justify-between">
              <PoppinsText tag="h1" fontSize="16px" className="font-bold">
                Total:
              </PoppinsText>
              <PoppinsText tag="h1" fontSize="16px" className="font-bold">
                ${formattedTotalPrice}
              </PoppinsText>
            </div>

            {/* Continue to Cart Button */}
            <Link href="/cart">
              <button className="mt-4 w-full rounded bg-[#ccb32b] py-2 text-white">
                {translations.cart.title}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
