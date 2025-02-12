import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'

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
    {
      image: '/images/features/image_3.avif',
      title: 'features.feature_3.title',
      subtitle: 'features.feature_3.subtitle',
    },
  ]

  return (
    <section className="flex w-screen flex-col items-center pt-32">
      {/* Feature Section */}
      {/* Feature array loop */}
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex w-full ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
        >
          {/* Image Section */}
          <div className="h-[450px] w-1/2">
            <img
              src={feature.image}
              alt={feature.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="flex h-[450px] w-1/2 flex-col items-center justify-center gap-4 bg-gray-200 p-10 text-center">
            <PoppinsText fontSize="44px" style="bold">
              {t(feature.title)}
            </PoppinsText>
            <div className="bg-gold mx-auto h-1 w-1/2 rounded-full" />
            <PoppinsText fontSize="16px" className="mx-10">
              <span
                dangerouslySetInnerHTML={{
                  __html: t(feature.subtitle),
                }}
              />
            </PoppinsText>
            {/* Button */}
            <button className="bg-gold hover:bg-hover_gold mt-4 rounded-full px-10 py-4 transition-all duration-300 ease-in-out hover:scale-105">
              <PoppinsText fontSize="16px" style="bold" className="text-white">
                {t('header.button')}
              </PoppinsText>
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}
