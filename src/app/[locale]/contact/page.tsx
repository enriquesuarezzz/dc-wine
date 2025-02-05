import { getTranslations } from 'next-intl/server'
export default async function ContactPage() {
  const t = await getTranslations('contact_page')
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
