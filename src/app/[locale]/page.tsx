import AgeVerificationPopup from '@/components/molecules/age_verification_pop_up/age_verification_pop_up'
import Features from '@/components/molecules/features/features'
import FreeOrderBanner from '@/components/molecules/free_order_banner/free_order_banner'
import Header from '@/components/molecules/header/header'
import TopSellingProducts from '@/components/molecules/top_selling_products/top_selling_products'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations('home_page')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function HomePage() {
  const t = await getTranslations('age_verification_pop_up')
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-white">🚧</h1>
        <h2 className="mb-8 text-balance text-5xl font-bold text-white">
          Página en Construcción
        </h2>
        <p className="text-xl text-gray-400">
          Estamos trabajando en algo increíble. Vuelve pronto.
        </p>
      </div>
    </div>
    // <main className="flex min-h-screen flex-col">
    //   <AgeVerificationPopup
    //     title={t('title')}
    //     message={t('message')}
    //     accept={t('accept')}
    //     exit={t('exit')}
    //   />
    //   <FreeOrderBanner />
    //   <Header />
    //   <TopSellingProducts />
    //   <Features />
    // </main>
  )
}
