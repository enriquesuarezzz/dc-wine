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
  const translations = {
    filters: t('filters'),
    sort_by_price: t('sort_by_price'),
    default: t('default'),
    low_to_high: t('low_to_high'),
    high_to_low: t('high_to_low'),
    category: t('category'),
    all_categories: t('all_categories'),
    red_wine: t('red_wine'),
    white_wine: t('white_wine'),
    sparkling_wine: t('sparkling_wine'),
    grape_type: t('grape_type'),
    origin: t('origin'),
    all_origins: t('all_origins'),
    all_grape_types: t('all_grape_types'),
  }
  return (
    <div className="mx-6 flex flex-col justify-center pt-24 md:mx-20">
      {/* title */}
      <PoppinsText fontSize="56px" style="bold" className="max-w-[500px]">
        {t('title')}
      </PoppinsText>
      {/* products */}
      <Products translations={translations} />
    </div>
  )
}
