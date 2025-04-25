import { PoppinsText } from '@/components/atoms/poppins_text'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata() {
  const t = await getTranslations('about_us_page')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}
export default async function AboutUs() {
  const t = await getTranslations('about_us_page')
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-10 pb-10 pt-24 md:gap-8 md:pb-16 md:pt-36 lg:flex-row lg:gap-8">
        <PoppinsText
          fontSize="44px"
          style="bold"
          className="max-w-[900px] text-center lg:max-w-[700px]"
        >
          {t('title')}
        </PoppinsText>
        <PoppinsText fontSize="14px" className="max-w-[500px] text-center">
          {t('subtitle')}
        </PoppinsText>
      </div>
      <div className="w-full">
        <Image
          src="/images/about_us_header.avif"
          alt="wine italy tuscany"
          width={1920}
          height={1080}
          className="h-full max-h-[650px] w-full object-cover"
        />
      </div>
      <div className="mx-4 flex flex-col gap-6 pt-10 md:mx-20 md:flex-row md:gap-10 md:pt-16">
        <PoppinsText fontSize="16px" className="">
          <span
            dangerouslySetInnerHTML={{
              __html: t('first_paragraph'),
            }}
          />
        </PoppinsText>
        <PoppinsText fontSize="16px" className="">
          <span
            dangerouslySetInnerHTML={{
              __html: t('second_paragraph'),
            }}
          />
        </PoppinsText>
      </div>
      <Image
        src="/images/about_us_image_1.avif"
        alt="bottle of wine glass of wine and grapes on a table"
        width={1920}
        height={600}
        className="h-full max-h-[600px] w-full object-cover px-0 pt-10 md:px-20 md:pt-16"
      />
      <PoppinsText fontSize="16px" className="mx-4 pt-10 md:mx-20 md:pt-16">
        <span
          dangerouslySetInnerHTML={{
            __html: t('last_paragraph'),
          }}
        />
      </PoppinsText>
    </section>
  )
}
