import Features from '@/components/molecules/features/features'
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
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <TopSellingProducts />
      <Features />
    </main>
  )
}
