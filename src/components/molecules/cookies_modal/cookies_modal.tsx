'use client'
import { COOKIE_CONSENT, CookieClient } from '@/utils/cookie'
import { useState } from 'react'
import { Open_Sans } from 'next/font/google'
import { PoppinsText } from '@/components/atoms/poppins_text'

export const openSans = Open_Sans({ subsets: ['latin'] })

export interface CookiesModalProps {
  checked: boolean
}

export default function CookiesModal({ checked }: CookiesModalProps) {
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
      <div
        className={`fixed bottom-0 left-0 z-40 flex h-fit w-fit flex-col justify-between gap-6 rounded-t-3xl bg-black/60 px-6 py-10 font-bold backdrop-blur-sm md:bottom-4 md:left-4 md:rounded-3xl`}
      >
        <div className="flex h-fit w-full max-w-[300px] flex-col gap-10">
          {/* Title + description */}
          <div className="flex h-fit w-full flex-col gap-5 text-center">
            {/* Title */}
            <PoppinsText
              fontSize="32px"
              className="max-w-[500px] text-center text-white"
            >
              Cookies
            </PoppinsText>
            {/* Description */}
            <div className="flex h-fit w-full flex-col gap-4">
              <PoppinsText
                fontSize="14px"
                className="max-w-[500px] text-center text-white"
              >
                En nuestro sitio web utilizamos cookies propias y de terceros
                para finalidades analíticas mediante el análisis del tráfico
                web.
              </PoppinsText>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex h-fit w-full flex-row justify-center gap-5">
            {/* Decline */}
            <button
              className="flex h-fit flex-col items-center justify-center border px-9 py-3 text-white hover:bg-white hover:text-black"
              onClick={() => handleCancelCookie()}
            >
              <PoppinsText
                fontSize="14px"
                className="max-w-[500px] text-center"
              >
                Rechazar
              </PoppinsText>
            </button>
            {/* Accept */}
            <button
              className="y flex h-fit flex-col items-center justify-center border bg-black px-9 py-3 text-white hover:bg-white hover:text-black"
              onClick={() => handleAcceptCookie()}
            >
              <PoppinsText
                fontSize="14px"
                className="max-w-[500px] text-center"
              >
                aceptar
              </PoppinsText>
            </button>
          </div>
        </div>
      </div>
    )
  )
}
