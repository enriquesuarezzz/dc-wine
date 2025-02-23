'use client'
import { PoppinsText } from '@/components/atoms/poppins_text'
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
    total: string
    shipping: string
  }
}

const CartContent = ({ translations }: CartContentProps) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart()

  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <PoppinsText fontSize="28px" style="bold">
        {translations.title}
      </PoppinsText>

      {cartItems.length === 0 ? (
        <PoppinsText fontSize="16px" style="bold">
          {translations.empty}
        </PoppinsText>
      ) : (
        <div className="flex w-full flex-col px-4">
          {/* Header Row */}
          <div className="mb-4 flex justify-between gap-4 border-b pb-2">
            <PoppinsText fontSize="16px" style="bold">
              {translations.product}
            </PoppinsText>
            <PoppinsText fontSize="16px" style="bold">
              {translations.quantity}
            </PoppinsText>
            <PoppinsText fontSize="16px" style="bold">
              {translations.price}
            </PoppinsText>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-4 flex items-center justify-between gap-4"
            >
              {/* Product Name */}
              <div className="flex w-1/3 items-center gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={40}
                  height={40}
                />
                <PoppinsText fontSize="16px">{item.name}</PoppinsText>
              </div>
              {/* Quantity */}
              <div className="flex w-1/6 items-center justify-center gap-2">
                <button
                  className="bg-blue-500 px-2 py-1 text-white"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <PoppinsText fontSize="16px">{item.quantity}</PoppinsText>
                <button
                  className="bg-blue-500 px-2 py-1 text-white"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
                {/* Remove Button */}
                <div className="flex w-1/6 justify-center">
                  <button
                    className="bg-red-500 px-2 py-1 text-white"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <PoppinsText fontSize="16px" className="text-white">
                      {translations.remove}
                    </PoppinsText>
                  </button>
                </div>
              </div>
              {/* Price */}
              <PoppinsText fontSize="16px" className="w-1/6 text-center">
                ${item.price}
              </PoppinsText>
            </div>
          ))}

          {/* Total */}
          <div className="mt-4 flex items-center justify-between">
            <PoppinsText fontSize="16px">{translations.subtotal}</PoppinsText>
            <PoppinsText fontSize="16px" className="font-bold">
              $
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0,
              )}
            </PoppinsText>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartContent
