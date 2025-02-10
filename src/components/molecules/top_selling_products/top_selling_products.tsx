import { PoppinsText } from '@/components/atoms/poppins_text'
import { getTranslations } from 'next-intl/server'

export default async function TopSellingProducts() {
  const t = await getTranslations('home_page')

  const products = [
    {
      image: 'images/top_selling/image1.avif',
      title: 'top_selling_products.dark_wine',
    },
    {
      image: 'images/top_selling/image2.avif',
      title: 'top_selling_products.exotic_wine',
    },
    {
      image: 'images/top_selling/image3.avif',
      title: 'top_selling_products.white_wine',
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center gap-10 pt-10">
      <div>
        <PoppinsText fontSize="28px" style="bold" className="pt-4">
          {t('top_selling_products.title')}
        </PoppinsText>
        <PoppinsText fontSize="16px" className="pt-2">
          {t('top_selling_products.subtitle')}
        </PoppinsText>
      </div>

      <div className="flex flex-wrap justify-center gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-4"
          >
            <img
              src={product.image}
              alt={t(product.title)}
              className="h-full max-h-[500px] w-full rounded-xl object-cover transition-all duration-300 ease-in-out hover:scale-105"
            />
            <PoppinsText fontSize="20px" className="pt-2" style="bold">
              {t(product.title)}
            </PoppinsText>
          </div>
        ))}
      </div>
    </section>
  )
}
