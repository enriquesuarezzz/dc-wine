'use client'
import { useCart } from '@/components/molecules/cart_context/cart_context'

interface CartContentProps {
  translations: {
    title: string
    empty: string
    remove: string
    quantity: string
    subtotal: string
    clear_cart: string
  }
}

const CartContent = ({ translations }: CartContentProps) => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <h1 className="mb-4 text-2xl">{translations.title}</h1>

      {cartItems.length === 0 ? (
        <p>{translations.empty}</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <img src={item.imageUrl} alt={item.name} width={40} height={40} />
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                className="bg-blue-500 px-2 py-1 text-white"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-blue-500 px-2 py-1 text-white"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
              <button
                className="bg-blue-500 px-2 py-1 text-white"
                onClick={() => removeFromCart(item.id)}
              >
                {translations.remove}
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 rounded bg-gray-800 px-4 py-2 text-white"
          >
            {translations.clear_cart}
          </button>
        </div>
      )}
    </div>
  )
}

export default CartContent
