import { Product } from '../../../../types/products'
import { getProducts } from '../../../../lib/firestore'
import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'

// Async page component to fetch data
export default async function ProductsPage({
  params,
}: {
  params: { locale: string }
}) {
  // Await the locale parameter
  const locale = await params.locale

  // Fetch data
  const products: Product[] = await getProducts(locale)
  const t = await getTranslations('products')

  return (
    <div className="mx-20 flex flex-col justify-center pt-24">
      <PoppinsText fontSize="56px" style="bold" className="max-w-[500px]">
        {t('title')}
      </PoppinsText>
      <div>
        {products.map((product) => (
          <div
            className="flex max-w-[300px] flex-col transition-all duration-300 ease-in-out hover:scale-105"
            key={product.id}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mb-4 h-48 w-full rounded-md object-contain"
            />
            <PoppinsText fontSize="16px" className="max-w-[500px]">
              {product.category}
            </PoppinsText>
            <PoppinsText fontSize="16px" className="max-w-[500px]">
              {product.name}
            </PoppinsText>
            <PoppinsText fontSize="16px" className="max-w-[500px]">
              {product.price}
            </PoppinsText>
          </div>
        ))}
      </div>
    </div>
  )
}
