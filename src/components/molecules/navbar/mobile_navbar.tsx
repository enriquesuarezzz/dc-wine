'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Link } from '@/i18n/routing'
import { PoppinsText } from '@/components/atoms/poppins_text'
import Search from '@/components/atoms/svg/search'
import Cart from '@/components/atoms/svg/cart'
import Spanish from '@/components/atoms/svg/spanish'
import English from '@/components/atoms/svg/english'
import { Menu, X } from 'lucide-react'
import SearchBar from '../search_bar/search_bar'

type Translations = {
  home: string
  about_us: string
  products: string
  select_language: string
  search_placeholder: string
  no_results: string
}

export function MobileMenu({ translations }: { translations: Translations }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    setMenuOpen(false)
  }

  const changeLanguage = (locale: string) => {
    router.push(`/${locale}`)
  }

  return (
    <div className="flex items-center gap-4 md:hidden">
      <SearchBar
        searchPlaceholder={translations.search_placeholder}
        noResults={translations.no_results}
      />
      <Cart />
      <button onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {menuOpen && (
        <div className="fixed inset-0 z-50 m-2 flex flex-col items-center justify-center rounded-3xl bg-gray-800/70 shadow-xl backdrop-blur-lg">
          <button
            className="absolute right-4 top-4"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-6">
            <Link href="/" onClick={() => handleNavigation('/')}>
              <PoppinsText
                tag="h1"
                fontSize="32px"
                style="bold"
                className="text-white hover:scale-110"
              >
                {translations.home}
              </PoppinsText>
            </Link>
            <Link
              href="/about_us"
              onClick={() => handleNavigation('/about_us')}
            >
              <PoppinsText
                tag="h1"
                fontSize="32px"
                style="bold"
                className="text-white hover:scale-110"
              >
                {translations.about_us}
              </PoppinsText>
            </Link>
            <Link
              href="/products"
              onClick={() => handleNavigation('/products')}
            >
              <PoppinsText
                tag="h1"
                fontSize="32px"
                style="bold"
                className="text-white hover:scale-110"
              >
                {translations.products}
              </PoppinsText>
            </Link>
            <PoppinsText
              tag="h1"
              fontSize="32px"
              style="bold"
              className="text-white hover:scale-110"
            >
              {translations.select_language}
            </PoppinsText>
            <div className="flex items-center space-x-4">
              <button onClick={() => changeLanguage('es')}>
                <Spanish className="h-8 w-8 hover:scale-110" />
              </button>
              <button onClick={() => changeLanguage('en')}>
                <English className="h-8 w-8 hover:scale-110" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
