import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'

export default async function About() {
  const t = await getTranslations('HomePage')
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  )
}
