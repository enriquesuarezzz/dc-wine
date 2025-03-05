'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '../../../../lib/firebaseConfig'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { useLocale } from 'next-intl'
import SearchIcon from '@/components/atoms/svg/search'
import { Close } from '@/components/atoms/svg/close'

interface Product {
  id: string
  name: string
  imageUrl: string
}
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

const SearchBar = ({
  searchPlaceholder,
  noResults,
}: {
  searchPlaceholder: string
  noResults: string
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()
  const locale = useLocale()

  const debouncedQuery = useDebounce(searchQuery, 500)

  const searchRef = useRef<HTMLDivElement | null>(null)
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (debouncedQuery.trim() === '') {
      setProducts([])
      return
    }

    const fetchProducts = async () => {
      try {
        const collectionName = locale === 'en' ? 'products_en' : 'products_es'
        const uppercaseQuery = debouncedQuery.toUpperCase()

        const q = query(
          collection(db, collectionName),
          orderBy('name'),
          where('name', '>=', uppercaseQuery),
          where('name', '<=', uppercaseQuery + '\uf8ff'),
        )

        const querySnapshot = await getDocs(q)

        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || '',
          imageUrl: doc.data().imageUrl || '',
        }))

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
          className="fixed left-0 right-0 top-0 z-20 mx-1 flex items-center justify-center p-4 md:mx-20"
        >
          <div className="relative w-full rounded-lg bg-white p-4 shadow-lg">
            <div className="relative">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-6 w-full rounded bg-white px-8 py-2 text-xl text-black focus:border-none focus:outline-none md:px-20"
              />
              <button
                onClick={() => setIsSearchActive(false)}
                aria-label="Close Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded-full p-2"
              >
                <Close color="black" />
              </button>

              <div className="absolute left-1 top-1/2 -translate-y-1/2 transform md:left-5">
                <SearchIcon />
              </div>
            </div>

            {/* Search Results */}
            {debouncedQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto rounded-lg bg-white shadow-lg">
                {products.length > 0 ? (
                  <ul>
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex cursor-pointer items-center gap-4 px-4 py-2 text-black hover:bg-gray-100"
                        onClick={() => {
                          setIsSearchActive(false) // Close search bar
                          router.push(`/${locale}/products/${product.id}`) // Navigate to product page with locale
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                        <span>{product.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-black">{noResults}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!isSearchActive && (
        <button
          onClick={() => setIsSearchActive(true)}
          className="rounded-full p-2"
          aria-label="Open Search"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  )
}

export default SearchBar
