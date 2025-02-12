import { PoppinsText } from '@/components/atoms/poppins_text'
import { getTranslations } from 'next-intl/server'
export default async function AboutUs() {
  const t = await getTranslations('about_us_page')
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center gap-44 pb-20 pt-36">
        <PoppinsText fontSize="56px" style="bold" className="max-w-[600px]">
          {t('title')}
        </PoppinsText>
        <PoppinsText fontSize="14px" className="max-w-[500px] text-center">
          {t('subtitle')}
        </PoppinsText>
      </div>
      <div className="w-full">
        <img
          src="/images/about_us_header.avif"
          alt="wine italy tuscany"
          className="h-full max-h-[650px] w-full object-cover"
        />
      </div>
      <div className="mx-20 flex gap-10 pt-16">
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
      <img
        src="/images/about_us_image_1.avif"
        alt="wine italy tuscany"
        className="h-full max-h-[600px] w-full object-cover px-20 pt-16"
      />
      <PoppinsText
        fontSize="32px"
        style="bold"
        className="items-center pt-8 text-darker_orange"
      >
        {t('why_drink_it')}
      </PoppinsText>
      <div className="mx-20 flex gap-10 pt-8">
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
    </section>
  )
}
