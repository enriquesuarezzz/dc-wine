import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('home_page')
  return (
    <div>
     
    </div>
  )
}
