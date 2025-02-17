import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'
import Products from '@/components/molecules/products/products'

export async function generateMetadata() {
  const t = await getTranslations('products_page')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}
export default async function ProductsPage() {
  const t = await getTranslations('products_page')
  return (
    <div className="mx-20 flex flex-col justify-center pt-24">
      {/* title */}
      <PoppinsText fontSize="56px" style="bold" className="max-w-[500px]">
        {t('title')}
      </PoppinsText>
      {/* products */}
      <Products />
    </div>
  )
}
