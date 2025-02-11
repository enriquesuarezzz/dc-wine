'use client'

import { Locale, routing, usePathname, useRouter } from '@/i18n/routing'

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
  es: <Spanish className="h-6 w-6" />,
  en: <English className="h-6 w-6" />,
}

const localeNames: Record<string, string> = {
  es: 'ES',
  en: 'EN',
}

type Props = {
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({ defaultValue }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function onSelectChange(nextLocale: string) {
    router.replace({ pathname }, { locale: nextLocale as Locale })
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onSelectChange}>
      <SelectTrigger className="bg-transparent">
        <SelectValue>{localeIcons[defaultValue]}</SelectValue>
      </SelectTrigger>
      <SelectContent className="flex rounded-lg bg-gray-200 p-2">
        {routing.locales.map((locale) => (
          <SelectItem
            key={locale}
            value={locale}
            className="bg-gray flex rounded-md p-2 transition"
          >
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
