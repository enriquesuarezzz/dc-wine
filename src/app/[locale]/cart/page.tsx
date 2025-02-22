'use client'

import { useCart } from '@/components/molecules/cart_context/cart_context'

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart()

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
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
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="mt-4 rounded bg-gray-800 px-4 py-2 text-white"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  )
}

export default CartPage
