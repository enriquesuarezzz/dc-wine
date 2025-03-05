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
      <div className="flex w-full flex-col items-center justify-center gap-8 pb-16 pt-24 md:pt-36 lg:flex-row">
        <PoppinsText fontSize="56px" style="bold" className="max-w-[500px]">
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
      <div className="mx-4 flex flex-col gap-10 pt-16 md:mx-20 md:flex-row">
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
        className="h-full max-h-[600px] w-full object-cover px-0 pt-16 md:px-20"
      />
      <PoppinsText
        fontSize="32px"
        style="bold"
        className="items-center pt-8 text-gold"
      >
        {t('why_drink_it')}
      </PoppinsText>
      <div className="mx-4 flex flex-col gap-10 pt-8 md:mx-20 md:flex-row">
        <PoppinsText fontSize="16px" className="">
          <span
            dangerouslySetInnerHTML={{
              __html: t('third_paragraph'),
            }}
          />
        </PoppinsText>
        <PoppinsText fontSize="16px" className="">
          <span
            dangerouslySetInnerHTML={{
              __html: t('fourth_paragraph'),
            }}
          />
        </PoppinsText>
      </div>
      <div className="mx-20 flex flex-col items-center justify-center gap-6 pt-4">
        <PoppinsText fontSize="16px" className="items-center pt-8">
          {t('last_paragraph')}
        </PoppinsText>
        <Image
          src="/images/signature.avif"
          alt="wine italy tuscany"
          width={200}
          height={200}
          className="h-full max-h-[200px] w-full max-w-[200px] object-cover"
        />
        <PoppinsText fontSize="16px" style="bold">
          Iris de Cesero
        </PoppinsText>
        <PoppinsText fontSize="16px">CEO DcWine</PoppinsText>
      </div>
    </section>
  )
}
