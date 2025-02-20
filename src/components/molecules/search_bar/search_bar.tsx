'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '../../../../lib/firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { useLocale } from 'next-intl' // For detecting the current locale
import SearchIcon from '@/components/atoms/svg/search'
import Close from '@/components/atoms/svg/close'

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [products, setProducts] = useState<any[]>([]) // Store search results
  const router = useRouter()
  const locale = useLocale() // Get the current locale

  const debouncedQuery = useDebounce(searchQuery, 500) // Debounce the search query

  const searchRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`)
    }
  }

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      console.log('Debounced query is empty, clearing products')
      setProducts([]) // Clear products if search query is empty
      return
    }

    const fetchProducts = async () => {
      console.log(`Searching for products with query: "${debouncedQuery}"`)

      try {
        const collectionName = locale === 'en' ? 'products_en' : 'products_es'
        const uppercaseQuery = debouncedQuery.toUpperCase()

        console.log(`Using collection: ${collectionName}`)
        console.log(
          `Querying products where name >= "${uppercaseQuery}" and <= "${uppercaseQuery}\uf8ff"`,
        )

        const q = query(
          collection(db, collectionName),
          orderBy('name'), // Required for range queries
          where('name', '>=', uppercaseQuery),
          where('name', '<=', uppercaseQuery + '\uf8ff'),
        )

        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          console.log('No products found for this search')
        }

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include product ID
          ...doc.data(),
        }))

        console.log('Fetched products:', productList)
        setProducts(productList)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [debouncedQuery, locale])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        backgroundRef.current &&
        !backgroundRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  console.log('Current search query:', searchQuery)
  console.log('Debounced search query:', debouncedQuery)

  return (
    <div className="relative">
      {isSearchActive && (
        <div
          ref={backgroundRef}
          className="fixed inset-0 z-10 bg-black bg-opacity-70 backdrop-blur-lg"
        />
      )}

      {isSearchActive && (
        <div
          ref={searchRef}
          className="fixed left-0 right-0 top-0 z-20 flex items-center justify-center p-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded border-2 border-gray-300 bg-white px-20 py-2 text-xl"
            />
            <button
              onClick={() => setIsSearchActive(false)} // Close the search bar
              className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-200 p-2"
            >
              <Close />
            </button>

            <div className="absolute left-5 top-1/2 -translate-y-1/2 transform">
              <SearchIcon />
            </div>
          </div>
        </div>
      )}

      {!isSearchActive && (
        <button
          onClick={() => setIsSearchActive(true)} // Show the search input when clicked
          className="rounded-full bg-gray-200 p-2"
        >
          <SearchIcon />
        </button>
      )}

      {/* Display search results */}
      {debouncedQuery && products.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto bg-white shadow-lg">
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => router.push(`/product/${product.id}`)} // Navigate to product details
              >
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* If no products found, show message */}
      {debouncedQuery && products.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto bg-white shadow-lg">
          <p className="px-4 py-2 text-gray-500">No products found</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
