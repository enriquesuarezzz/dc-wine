'use client'

import { Locale, routing, usePathname, useRouter } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'
import English from '@/components/atoms/svg/english'
import Spanish from '@/components/atoms/svg/spanish'
import { JSX } from 'react'

const localeIcons: Record<string, JSX.Element> = {
  es: <Spanish className="w-6 h-6" />,
  en: <English className="w-6 h-6" />,
}

const localeNames: Record<string, string> = {
  es: 'ES',
  en: 'EN',
}

type Props = {
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(nextLocale: string) {
    router.replace(
      { pathname },
      { locale: nextLocale as Locale }
    )
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger className="bg-transparent">
        <SelectValue >
          {localeIcons[defaultValue]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-gray-200 flex rounded-lg border border-gray-200 p-2">
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}    className="bg-gray flex p-2 rounded-md transition">
             <div className="flex items-center gap-2">
              {localeIcons[locale]} 
              <span>{localeNames[locale]}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
