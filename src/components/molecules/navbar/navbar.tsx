import Image from 'next/image'
import LocaleSwitcher from '../locale_switcher/locale_switcher'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import Search from '@/components/atoms/svg/search'
import Cart from '@/components/atoms/svg/cart'

export default async function NavBar() {
  const t = await getTranslations('navbar')
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between rounded-b-3xl bg-[#f8f7f7] px-20 py-4 text-white">
      {/* Logo */}
      <Image src="/images/logo.avif" alt="Logo" width={60} height={60} />
      <div className="flex items-center justify-center gap-10">
        {/* Navigation Links */}
        {/* Home link */}
        <Link href="/">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative block w-fit pl-2 text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-hover_orange after:transition after:duration-300 after:content-[''] hover:text-hover_orange after:hover:scale-x-100"
          >
            {t('home')}
          </PoppinsText>
        </Link>
        {/* About Us link */}
        <Link href="/about_us">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative block w-fit pl-2 text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-hover_orange after:transition after:duration-300 after:content-[''] hover:text-hover_orange after:hover:scale-x-100"
          >
            {t('about_us')}
          </PoppinsText>
        </Link>
        {/* Products link */}
        <Link href="/products">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="relative block w-fit pl-2 text-black after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-hover_orange after:transition after:duration-300 after:content-[''] hover:text-hover_orange after:hover:scale-x-100"
          >
            {t('products')}
          </PoppinsText>
        </Link>
      </div>
      {/* Search, Cart and Locale Switcher */}
      <div className="flex items-center justify-center gap-10">
        <Search />
        <Cart />
        <LocaleSwitcher />
      </div>
    </div>
  )
}
