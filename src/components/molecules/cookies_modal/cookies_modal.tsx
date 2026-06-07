'use client'
import { COOKIE_CONSENT, CookieClient } from '@/utils/cookie'
import { useState, useEffect } from 'react'
import { Open_Sans } from 'next/font/google'
import { PoppinsText } from '@/components/atoms/poppins_text'
import Cookies from '@/components/atoms/svg/cookies'

export const openSans = Open_Sans({ subsets: ['latin'] })

export interface CookiesModalProps {
  checked: boolean
  translations: {
    title: string
    message: string
    accept: string
    reject: string
  }
}

export default function CookiesModal({ translations }: CookiesModalProps) {
  const [showModal, setShowModal] = useState(false)

  // Check the cookie when the component mounts
  useEffect(() => {
    const cookieConsent = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_CONSENT}=`))

    // If cookie exists, set showModal to false
    if (cookieConsent) {
      setShowModal(false)
    } else {
      setShowModal(true) // Show the modal if cookie doesn't exist
    }
  }, [])

  const handleAcceptCookie = () => {
    CookieClient.setCookie(COOKIE_CONSENT, 'true', 365) // Set the cookie for 1 year
    setShowModal(false) // Hide the modal
  }

  const handleCancelCookie = () => {
    CookieClient.deleteCookie(COOKIE_CONSENT) // Delete the cookie if declined
    setShowModal(false) // Hide the modal
  }

  return (
    showModal && (
      <div className="fixed bottom-0 left-0 z-40 flex h-fit w-fit flex-col justify-between gap-6 rounded-t-3xl bg-mate_black px-6 py-10 backdrop-blur-sm md:bottom-4 md:left-4 md:rounded-3xl">
        <div className="flex h-fit w-full flex-col gap-10 md:max-w-[300px]">
          {/* Title + description */}
          <div className="flex h-fit w-full flex-col gap-5 text-center">
            <div className="flex items-center justify-center gap-4">
              {/* Title */}
              <PoppinsText
                fontSize="32px"
                style="semibold"
                className="max-w-[500px] text-center text-gold"
              >
                {translations.title}
              </PoppinsText>
              <Cookies />
            </div>
            {/* Description */}
            <div className="flex h-fit w-full flex-col gap-4">
              <PoppinsText
                fontSize="14px"
                style="semibold"
                className="max-w-[500px] text-center text-gold"
              >
                {translations.message}
              </PoppinsText>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex h-fit w-full flex-row justify-center gap-5">
            {/* Decline */}
            <button
              className="flex h-fit flex-col items-center justify-center border border-white px-3 py-2 text-white hover:bg-gold md:px-9 md:py-3"
              onClick={handleCancelCookie}
            >
              <PoppinsText
                fontSize="14px"
                className="max-w-[500px] text-center"
              >
                {translations.reject}
              </PoppinsText>
            </button>
            {/* Accept */}
            <button
              className="flex h-fit flex-col items-center justify-center border border-white bg-black px-3 py-2 text-white hover:bg-gold md:px-9 md:py-3"
              onClick={handleAcceptCookie}
            >
              <PoppinsText
                fontSize="14px"
                className="max-w-[500px] text-center"
              >
                {translations.accept}
              </PoppinsText>
            </button>
          </div>
        </div>
      </div>
    )
  )
}
