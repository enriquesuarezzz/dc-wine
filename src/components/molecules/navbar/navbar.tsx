import Image from 'next/image'
import LocaleSwitcher from '../locale_switcher/locale_switcher'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Search from '@/components/atoms/svg/search'
import Cart from '@/components/atoms/svg/cart'

export default async function NavBar() {
  const t = await getTranslations('navbar')
  return (
    <div className="flex items-center justify-between rounded-3xl px-20 py-4 text-white">
      <Image src="/images/logo.avif" alt="Logo" width={60} height={60} />
      <div className="flex items-center justify-center gap-10">
        <Link href="/">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="text-black"
          >
            {t('home')}
          </PoppinsText>
        </Link>
        <Link href="/about_us">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="text-black"
          >
            {t('about_us')}
          </PoppinsText>
        </Link>
        <Link href="/products">
          <PoppinsText
            tag="h1"
            fontSize="16px"
            style="bold"
            className="text-black"
          >
            {t('products')}
          </PoppinsText>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-10">
        <Search />
        <Cart />
        <LocaleSwitcher />
      </div>
    </div>
  )
}
