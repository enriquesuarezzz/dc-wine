import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'
export async function generateMetadata() {
  const t = await getTranslations('terms_and_conditions_page')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}
export default async function TermsAndConditionsPage() {
  const t = await getTranslations('terms_and_conditions_page')

  return (
    <div className="mx-6 flex flex-col justify-center gap-4 pt-24 md:mx-20">
      {/* Title */}
      <PoppinsText fontSize="56px" style="bold">
        {t('title')}
      </PoppinsText>
      <PoppinsText fontSize="14px" className="">
        <span
          dangerouslySetInnerHTML={{
            __html: t('first_paragraph'),
          }}
        />
      </PoppinsText>
      <ul className="list-inside list-disc">
        <li>{t('list_1.li_1')}</li>
        <li>{t('list_1.li_2')}</li>
      </ul>
      <PoppinsText fontSize="14px">{t('after_list')}</PoppinsText>
      <ul className="list-inside list-disc">
        <li>{t('list_2.li_1')}</li>
        <li>{t('list_2.li_2')}</li>
        <li>{t('list_2.li_3')}</li>
      </ul>
      <PoppinsText fontSize="14px" className="">
        <span
          dangerouslySetInnerHTML={{
            __html: t('last_paragraph'),
          }}
        />
      </PoppinsText>
    </div>
  )
}
