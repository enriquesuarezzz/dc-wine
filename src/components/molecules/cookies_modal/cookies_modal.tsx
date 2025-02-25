'use client'
import { COOKIE_CONSENT, CookieClient } from '@/utils/cookie'
import { useState } from 'react'
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

export default function CookiesModal({
  checked,
  translations,
}: CookiesModalProps) {
  const [showModal, setShowModal] = useState(!checked)

  const handleAcceptCookie = () => {
    CookieClient.setCookie(COOKIE_CONSENT, 'true')
    setShowModal(false)
  }

  const handleCancelCookie = () => {
    CookieClient.deleteCookie(COOKIE_CONSENT)
    setShowModal(false)
  }

  return (
    showModal && (
      <div className="fixed bottom-0 left-0 z-40 flex h-fit w-fit flex-col justify-between gap-6 rounded-t-3xl bg-gold px-6 py-10 backdrop-blur-sm md:bottom-4 md:left-4 md:rounded-3xl">
        <div className="flex h-fit w-full max-w-[300px] flex-col gap-10">
          {/* Title + description */}
          <div className="flex h-fit w-full flex-col gap-5 text-center">
            <div className="flex items-center justify-center gap-4">
              {/* Title */}
              <PoppinsText
                fontSize="32px"
                style="semibold"
                className="max-w-[500px] text-center text-black"
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
                className="max-w-[500px] text-center text-black"
              >
                {translations.message}
              </PoppinsText>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex h-fit w-full flex-row justify-center gap-5">
            {/* Decline */}
            <button
              className="flex h-fit flex-col items-center justify-center border border-black px-3 py-2 text-black md:px-9 md:py-3"
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
              className="flex h-fit flex-col items-center justify-center border border-white bg-black px-3 py-2 text-white md:px-9 md:py-3"
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
