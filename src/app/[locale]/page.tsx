import { BarlowText } from '@/components/atoms/barlow_text'
import MainCarousel from '@/components/molecules/main_carousel/main_carousel'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('home_page')
  return (
    <main className="mx-20 flex h-full flex-col items-center justify-center">
      <section className="flex items-center justify-center gap-40">
        <BarlowText text={t('title')} fontSize="32px" style="bold" />
        <BarlowText
          text={t('subtitle')}
          fontSize="16px"
          style="bold"
          className="max-w-[500px]"
        />
      </section>
      <MainCarousel />
    </main>
  )
}
