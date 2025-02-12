import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'

export default async function Header() {
  const t = await getTranslations('home_page')
  return (
    <section className="relative flex h-full w-full items-center justify-center">
      <img
        src="/images/header.avif"
        alt="2 wine glasses on a table with grapes and a bottle of wine"
        className="h-full max-h-[650px] w-full object-cover"
      />
      {/* Overlay Div */}
      <div className="bg-light_gold absolute right-72 rounded-lg p-10">
        <PoppinsText fontSize="16px" style="bold">
          {t('header.header_title')}
        </PoppinsText>
        <PoppinsText
          className="text-hover_gold pt-2 font-bold"
          fontSize="32px"
          style="bold"
        >
          <span dangerouslySetInnerHTML={{ __html: t('header.title') }} />
        </PoppinsText>
        <PoppinsText fontSize="16px" style="bold" className="pt-4">
          {t('header.subtitle')}
        </PoppinsText>
        <button className="hover:bg-hover_gold bg-gold mt-8 rounded-full px-10 py-4 font-bold text-white transition-all duration-300 ease-in-out hover:scale-105">
          {t('header.button')}
        </button>
      </div>
    </section>
  )
}
