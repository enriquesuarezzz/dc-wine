'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Function to ensure the price is correctly formatted as a number
  const parsePrice = (price: unknown): number | null => {
    if (typeof price === 'number') {
      return price
    }
    if (typeof price === 'string') {
      const normalizedPrice = price.replace(',', '.')
      const parsedPrice = parseFloat(normalizedPrice)
      return isNaN(parsedPrice) ? null : parsedPrice
    }
    return null
  }

  // Add item to cart or increase quantity if it already exists
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const price = parsePrice(item.price)

    if (price === null) {
      return
    }

    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      } else {
        return [...prevCart, { ...item, price, quantity: 1 }]
      }
    })
  }

  // Remove item from cart completely
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  // Increase item quantity
  const increaseQuantity = (id: string) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  // Decrease item quantity, remove if it reaches 0
  const decreaseQuantity = (id: string) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  // Clear the cart
  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
