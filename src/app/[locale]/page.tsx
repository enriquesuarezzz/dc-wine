import Features from '@/components/molecules/features/features'
import Header from '@/components/molecules/header/header'
import TopSellingProducts from '@/components/molecules/top_selling_products/top_selling_products'

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <TopSellingProducts />
      <Features />
    </main>
  )
}
