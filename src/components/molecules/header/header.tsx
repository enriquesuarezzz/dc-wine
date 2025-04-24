import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'
import Image from 'next/image'

export default async function Header() {
  const t = await getTranslations('home_page')
  return (
    <section className="relative flex h-full w-full items-center justify-center">
      <Image
        src="/images/header.avif"
        alt="2 wine glasses on a table with grapes and a bottle of wine"
        width={1920}
        height={650}
        priority
        quality={30}
        className="h-[450px] w-full object-cover md:h-full md:max-h-[650px]"
      />
      {/* Blur Overlay
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] md:backdrop-blur-[3px]" /> */}
      {/* Overlay Div */}
      <div className="absolute rounded-lg p-3 md:right-4 md:bg-light_gold md:p-10 lg:right-28">
        <PoppinsText
          className="pt-2 font-bold text-hover_gold"
          fontSize="32px"
          style="bold"
        >
          <span dangerouslySetInnerHTML={{ __html: t('header.title') }} />
        </PoppinsText>
        <PoppinsText
          fontSize="16px"
          style="bold"
          className="pt-2 text-white md:pt-4 md:text-black"
        >
          <span dangerouslySetInnerHTML={{ __html: t('header.subtitle') }} />
        </PoppinsText>
        <Link href="/products">
          <button className="mt-4 rounded-full bg-gold px-6 py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-hover_gold md:mt-8 md:px-10 md:py-4">
            <PoppinsText fontSize="16px" style="bold" className="text-white">
              {t('header.button')}
            </PoppinsText>
          </button>
        </Link>
      </div>
    </section>
  )
}
