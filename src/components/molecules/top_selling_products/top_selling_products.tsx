import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export default async function TopSellingProducts() {
  const t = await getTranslations('home_page')

  const products = [
    {
      image: '/images/top_selling/image1.avif',
      title: 'top_selling_products.dark_wine',
    },
    {
      image: '/images/top_selling/image2.avif',
      title: 'top_selling_products.exotic_wine',
    },
    {
      image: '/images/top_selling/image3.avif',
      title: 'top_selling_products.white_wine',
    },
  ]

  return (
    <section className="mx-6 flex flex-col items-center justify-center gap-10 pt-4 md:mx-0 md:pt-10">
      <div>
        <PoppinsText fontSize="28px" style="bold" className="pt-4">
          {t('top_selling_products.title')}
        </PoppinsText>
      </div>

      <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 md:gap-4"
          >
            <Link href="/products">
              <img
                src={product.image}
                alt={t(product.title)}
                className="h-full max-h-[300px] w-full rounded-xl object-cover transition-all duration-300 ease-in-out hover:scale-105 md:max-h-[500px]"
              />
            </Link>
            <PoppinsText fontSize="20px" className="pt-2" style="bold">
              {t(product.title)}
            </PoppinsText>
          </div>
        ))}
      </div>
    </section>
  )
}
