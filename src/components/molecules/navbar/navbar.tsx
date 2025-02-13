import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { PoppinsText } from '@/components/atoms/poppins_text'
import LocaleSwitcher from '../locale_switcher/locale_switcher'
import { MobileMenu } from './mobile_navbar'

export default async function NavBar() {
  const t = await getTranslations('navbar')

  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between rounded-b-3xl bg-[#f8f7f7] px-6 py-4 text-white md:px-20">
      <Image src="/images/logo.avif" alt="Logo" width={50} height={50} />
      <MobileMenu
        translations={{
          home: t('home'),
          about_us: t('about_us'),
          products: t('products'),
          select_language: t('select_language'),
        }}
      />
      <div className="hidden items-center gap-10 md:flex">
        <Link href="/">
          <PoppinsText tag="h1" fontSize="16px" style="bold">
            {t('home')}
          </PoppinsText>
        </Link>
        <Link href="/about_us">
          <PoppinsText tag="h1" fontSize="16px" style="bold">
            {t('about_us')}
          </PoppinsText>
        </Link>
        <Link href="/products">
          <PoppinsText tag="h1" fontSize="16px" style="bold">
            {t('products')}
          </PoppinsText>
        </Link>
        <LocaleSwitcher />
      </div>
    </div>
  )
}
