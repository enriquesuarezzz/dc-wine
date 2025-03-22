'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  stock: number
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

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart or increase quantity if it already exists
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          )
        } else {
          // Show toast if stock is insufficient
          toast.error('Not enough stock available!')
          return prevCart
        }
      } else {
        if (item.stock > 0) {
          return [...prevCart, { ...item, quantity: 1 }] // Set initial quantity to 1 when adding a new item
        } else {
          // Show toast if stock is insufficient
          toast.error('Not enough stock available!')
          return prevCart
        }
      }
    })
  }

  // Remove item from cart completely
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id))
    // Show success toast for removing item
    toast.success('Item removed from cart')
  }

  // Increase item quantity
  const increaseQuantity = (id: string) => {
    setCartItems((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            // Show toast if stock is insufficient
            toast.error('Cannot increase quantity beyond stock')
            return item
          }
        }
        return item
      })
    })
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
    // Show success toast for decreasing quantity
    toast.success('Item quantity decreased')
  }

  // Clear the cart
  const clearCart = () => {
    setCartItems([])
    // Show success toast for clearing cart
    toast.success('Cart cleared')
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
