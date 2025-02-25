'use client'
import { useEffect, useState } from 'react'
import CookiesModal from '../cookies_modal/cookies_modal'
import { COOKIE_CONSENT } from '@/utils/cookie'

interface CookiesPopupProps {
  translations: {
    title: string
    message: string
    accept: string
    reject: string
  }
}

export default function CookiesPopup({ translations }: CookiesPopupProps) {
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_CONSENT}=`))

    if (cookies) {
      setConsent(cookies.split('=')[1] === 'true')
    }
  }, [])

  return <CookiesModal checked={consent} translations={translations} />
}
