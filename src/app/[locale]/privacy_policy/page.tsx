import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'
export async function generateMetadata() {
  const t = await getTranslations('privacy_policy_page')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}
export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacy_policy_page')

  return (
    <div className="mx-6 flex flex-col justify-center gap-4 pt-24 md:mx-20">
      {/* Title */}
      <PoppinsText fontSize="56px" style="bold">
        {t('title')}
      </PoppinsText>

      {/* Identification of Responsible */}
      <PoppinsText fontSize="20px" style="bold" className="mt-8">
        {t('identification_title')}
      </PoppinsText>
      {/* List */}
      <ul className="list-inside list-disc">
        <li>{t('identification_list.owner')}</li>
        <li>{t('identification_list.address')}</li>
        <li>{t('identification_list.nif')}</li>
        <li>{t('identification_list.email')}</li>
        <li>{t('identification_list.phone')}</li>
      </ul>
      {/* Information and Consent */}
      <PoppinsText fontSize="20px" style="bold">
        {t('information_and_consent_title')}
      </PoppinsText>
      <PoppinsText fontSize="16px">
        {t('information_and_consent_description')}
      </PoppinsText>

      {/* Table Data */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <tbody>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_data_activity')}
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_origin_title')}
              </td>
              <td className="p-3">{t('table_origin_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_legal_title')}
              </td>
              <td className="p-3">{t('table_legal_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_treatment_title')}
              </td>
              <td className="p-3">{t('table_treatment_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_collective_title')}
              </td>
              <td className="p-3">{t('table_collective_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_data_category_title')}
              </td>
              <td className="p-3">{t('table_data_category_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_recipients_title')}
              </td>
              <td className="p-3">{t('table_recipients_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_international_title')}
              </td>
              <td className="p-3">{t('table_international_description')}</td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 p-3">
                {t('table_storage_title')}
              </td>
              <td className="p-3">{t('table_storage_description')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Data of the interested party */}
      <PoppinsText fontSize="20px" style="bold">
        {t('data_of_the_interested_party_title')}
      </PoppinsText>
      <PoppinsText fontSize="16px">
        {t('data_of_the_interested_party_description')}
      </PoppinsText>
      {/* Data of the interested party */}
      <PoppinsText fontSize="20px" style="bold">
        {t('cookies_policy_title')}
      </PoppinsText>
      <PoppinsText fontSize="16px">
        {t('cookies_policy_description')}
      </PoppinsText>
      {/* Exercise of Rights */}
      <PoppinsText fontSize="20px" style="bold">
        {t('exercise_of_rights_title')}
      </PoppinsText>
      {/* Description */}
      <PoppinsText fontSize="16px">
        {t('exercise_of_rights_description')}
        {/* Link */}
        <a
          href="https://www.aepd.es/"
          target="_blank"
          className="text-gray-600 hover:text-hover_gold"
        >
          Agencia Española de Protección de Datos.
        </a>
      </PoppinsText>
      {/* Acceptance of the Privacy Policy */}
      {/* Title */}
      <PoppinsText fontSize="20px" style="bold">
        {t('acceptance_of_the_privacy_policy_title')}
      </PoppinsText>
      {/* Description */}
      <PoppinsText fontSize="16px">
        {t('acceptance_of_the_privacy_policy_description')}
      </PoppinsText>
    </div>
  )
}
