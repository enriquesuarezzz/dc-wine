import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'

export default async function Features() {
  const t = await getTranslations('home_page')

  const features = [
    {
      image: '/images/features/image_1.avif',
      title: 'features.feature_1.title',
      subtitle: 'features.feature_1.subtitle',
    },
    {
      image: '/images/features/image_2.avif',
      title: 'features.feature_2.title',
      subtitle: 'features.feature_2.subtitle',
    },
  ]

  return (
    <section className="flex w-screen flex-col items-center pt-10 md:pt-12 lg:pt-32">
      {/* Feature Section */}
      {/* Feature array loop */}
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex w-full flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
        >
          {/* Image Section */}
          <div className="h-[300px] w-full md:h-[450px] md:w-1/2">
            <img
              src={feature.image}
              alt={feature.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex h-auto w-full flex-col items-center justify-center gap-4 bg-gray-200 p-6 text-center md:h-[450px] md:w-1/2">
            <PoppinsText
              fontSize="32px"
              style="bold"
              className="md:text-[44px]"
            >
              {t(feature.title)}
            </PoppinsText>
            <div className="mx-auto h-1 w-1/2 rounded-full bg-gold" />
            <PoppinsText fontSize="14px" className="mx-5 md:text-[16px]">
              <span
                dangerouslySetInnerHTML={{
                  __html: t(feature.subtitle),
                }}
              />
            </PoppinsText>
            {/* Button */}
            <Link href="/products">
              <button className="mt-4 rounded-full bg-gold px-6 py-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-hover_gold md:px-10 md:py-4">
                <PoppinsText
                  fontSize="14px"
                  style="bold"
                  className="text-white md:text-[16px]"
                >
                  {t('header.button')}
                </PoppinsText>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
