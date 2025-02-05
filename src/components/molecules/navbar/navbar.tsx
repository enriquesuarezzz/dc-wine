import Image from 'next/image'
import LocaleSwitcher from '../locale_switcher/locale_switcher'
import { BarlowText } from '@/components/atoms/barlow_text'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Search from '@/components/atoms/svg/search'
import Cart from '@/components/atoms/svg/cart'

export default async function NavBar() {
  const t = await getTranslations('navbar')
  return (
    <div className="m-14 flex items-center justify-between rounded-3xl bg-gray-200 px-20 py-4 text-white">
      <Image src="/images/logo.avif" alt="Logo" width={60} height={60} />
      <div className="flex gap-10">
        <Link href="/about_us">
          <BarlowText
            text={t('about_us')}
            fontSize="16px"
            style="bold"
            className="text-custom_gray"
          />
        </Link>
        <Link href="/products">
          <BarlowText
            text={t('products')}
            fontSize="16px"
            style="bold"
            className="text-custom_gray"
          />
        </Link>
        <Search />
        <Cart />
        <LocaleSwitcher />
      </div>
    </div>
  )
}
