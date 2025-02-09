import MainCarousel from '@/components/molecules/header/header'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('home_page')
  return (
    <main className="flex min-h-screen flex-col">
      {/* <section className="flex items-center justify-center gap-40">
        <BarlowText text={t('title')} fontSize="32px" style="bold" />
        <BarlowText
          text={t('subtitle')}
          fontSize="16px"
          style="bold"
          className="max-w-[500px]"
        />
      </section> */}
      <MainCarousel />
    </main>
  )
}
