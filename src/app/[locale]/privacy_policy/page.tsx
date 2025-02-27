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
    <div className="mx-20 flex flex-col justify-center pt-24">
      {/* title */}
      <PoppinsText fontSize="56px" style="bold" className="max-w-[500px]">
        {t('title')}
      </PoppinsText>
    </div>
  )
}
