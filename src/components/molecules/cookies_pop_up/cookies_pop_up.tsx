'use client'
import { useEffect, useState } from 'react'
import CookiesModal from '../cookies_modal/cookies_modal'
import { COOKIE_CONSENT } from '@/utils/cookie'

export default function CookiesPopup() {
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_CONSENT}=`))

    if (cookies) {
      setConsent(cookies.split('=')[1] === 'true')
    }
  }, [])

  return <CookiesModal checked={consent} />
}
