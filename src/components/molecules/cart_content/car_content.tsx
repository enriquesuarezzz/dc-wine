'use client'
import { PoppinsText } from '@/components/atoms/poppins_text'
import Delete from '@/components/atoms/svg/delete'
import { useCart } from '@/components/molecules/cart_context/cart_context'

interface CartContentProps {
  translations: {
    title: string
    empty: string
    product: string
    quantity: string
    price: string
    remove: string
    subtotal: string
    shipping: string
    total: string
    checkout: string
  }
}

const CartContent = ({ translations }: CartContentProps) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart()

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )
  const shippingCost = 0
  const total = subtotal + shippingCost

  return (
    <div className="mx-4 flex flex-col justify-between gap-4 pt-24 md:px-10 lg:mx-24 lg:flex-row lg:gap-20 lg:px-4 lg:pt-32">
      {/* Cart Items Section */}
      <div className="w-full p-1 md:p-6 lg:w-2/3">
        <PoppinsText fontSize="28px" style="bold" className="pb-10">
          {translations.title}
        </PoppinsText>

        {cartItems.length === 0 ? (
          <div className="mt-10 flex justify-center">
            <PoppinsText fontSize="16px" style="bold">
              {translations.empty}
            </PoppinsText>
          </div>
        ) : (
          <div className="w-full">
            {/* Header Row */}
            <div className="grid grid-cols-12 border-b pb-2 text-center">
              <div className="col-span-6 text-left">
                <PoppinsText fontSize="22px">
                  {translations.product}
                </PoppinsText>
              </div>
              <div className="col-span-4">
                <PoppinsText fontSize="22px">
                  {translations.quantity}
                </PoppinsText>
              </div>
              <div className="col-span-2">
                <PoppinsText fontSize="22px">{translations.price}</PoppinsText>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center border-b py-4"
              >
                {/* Product Name */}
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="max-h-[50px] rounded-md object-cover md:max-h-[100px]"
                  />
                  <PoppinsText fontSize="19px">{item.name}</PoppinsText>
                </div>

                {/* Quantity + Remove */}
                <div className="col-span-4 flex flex-col items-center gap-1 md:gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded bg-gray-300 px-2 py-1 text-black hover:bg-gray-400"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <PoppinsText fontSize="16px">{item.quantity}</PoppinsText>
                    <button
                      className="rounded bg-gray-300 px-2 py-1 text-black hover:bg-gray-400"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="flex items-center gap-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Delete />
                    <PoppinsText fontSize="16px" className="text-red-500">
                      {translations.remove}
                    </PoppinsText>
                  </button>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <PoppinsText fontSize="19px">
                    {item.price.toFixed(2)} €
                  </PoppinsText>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary Section */}
      {cartItems.length > 0 && (
        <div className="w-full rounded-lg bg-white p-2 pt-4 md:p-10 lg:w-1/3 lg:p-6 lg:pt-10">
          <PoppinsText fontSize="22px" style="bold">
            {translations.total}
          </PoppinsText>

          <div className="mt-4 flex justify-between">
            <PoppinsText fontSize="16px">{translations.subtotal}</PoppinsText>
            <PoppinsText fontSize="16px">{subtotal.toFixed(2)} €</PoppinsText>
          </div>

          <div className="mt-2 flex justify-between">
            <PoppinsText fontSize="16px">{translations.shipping}</PoppinsText>
            <PoppinsText fontSize="16px">
              {shippingCost.toFixed(2)} €
            </PoppinsText>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 font-bold">
            <PoppinsText fontSize="16px">{translations.total}</PoppinsText>
            <PoppinsText fontSize="16px">{total.toFixed(2)} €</PoppinsText>
          </div>

          <button className="mt-6 w-full rounded bg-gray-800 py-2 text-white hover:bg-gray-900">
            checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default CartContent
