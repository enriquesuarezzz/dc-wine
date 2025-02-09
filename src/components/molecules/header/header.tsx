import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'

export default async function Header() {
  const t = await getTranslations('home_page')
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <img
        src="images/header.avif"
        alt=""
        className="h-full max-h-[650px] w-full object-cover"
      />
      {/* Overlay Div */}
      <div className="absolute right-72 rounded-lg bg-[#fff3e3] p-10">
        <PoppinsText fontSize="16px" style="bold">
          {t('header')}
        </PoppinsText>
        <PoppinsText
          className="pt-2 font-bold text-[#b98e2f]"
          fontSize="32px"
          style="bold"
        >
          <span dangerouslySetInnerHTML={{ __html: t('title') }} />
        </PoppinsText>
        <PoppinsText fontSize="16px" style="bold" className="pt-4">
          {t('subtitle')}
        </PoppinsText>
        <button className="mt-8 rounded-full bg-[#b98e2f] px-10 py-4 font-bold text-white">
          {t('button')}
        </button>
      </div>
    </div>
  )
}
