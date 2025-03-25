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
      {/* First Paragraph */}
      <PoppinsText fontSize="16px" className="">
        <span
          dangerouslySetInnerHTML={{
            __html: t('first_paragraph'),
          }}
        />
      </PoppinsText>
      {/* First List */}
      <ul className="list-inside list-disc">
        <li>
          <PoppinsText fontSize="14px" className="inline">
            {t('list_1.li_1')}
          </PoppinsText>
        </li>
        <li>
          <PoppinsText fontSize="14px" className="inline">
            {t('list_1.li_2')}
          </PoppinsText>
        </li>
      </ul>
      <PoppinsText fontSize="16px">{t('after_list')}</PoppinsText>
      {/* Second List */}
      <ul className="list-inside list-disc">
        <li>
          <PoppinsText fontSize="14px" className="inline">
            {t('list_2.li_1')}
          </PoppinsText>
        </li>
        <li>
          <PoppinsText fontSize="14px" className="inline">
            {t('list_2.li_2')}
          </PoppinsText>
        </li>
        <li>
          <PoppinsText fontSize="14px" className="inline">
            {t('list_2.li_3')}
          </PoppinsText>
        </li>
      </ul>
      {/* Last Paragraph */}
      <PoppinsText fontSize="16px" className="">
        <span
          dangerouslySetInnerHTML={{
            __html: t('last_paragraph'),
          }}
        />
      </PoppinsText>
    </div>
  )
}
