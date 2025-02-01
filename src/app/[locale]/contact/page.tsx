import { getTranslations } from 'next-intl/server'
export default async function ContactPage() {
  const t = await getTranslations('ContactPage')
  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  )
}
