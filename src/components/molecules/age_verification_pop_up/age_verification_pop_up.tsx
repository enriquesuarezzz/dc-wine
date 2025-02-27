'use client'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { useEffect, useState } from 'react'

//props
interface AgeVerificationPopupProps {
  title: string
  message: string
  accept: string
  exit: string
}
const AgeVerificationPopup = ({
  title,
  message,
  accept,
  exit,
}: AgeVerificationPopupProps) => {
  const [isVerified, setIsVerified] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Ensure this runs only on the client
    setIsClient(true)
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('isAdult') === 'true'
    ) {
      setIsVerified(true)
    }
  }, [])

  const handleVerification = (isAdult: boolean) => {
    setIsVerified(isAdult)
    if (isAdult) {
      // Save the age verification status in localStorage
      localStorage.setItem('isAdult', 'true')
    } else {
      // Handle case for users who are not adult
      window.location.href = 'https://www.google.com'
    }
  }

  // If already verified, do not show the popup
  if (!isClient || isVerified) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] md:backdrop-blur-[3px]" />
      {/* Overlay Div */}
      <div className="bg-mate_black relative mx-4 flex flex-col items-center justify-center gap-1 rounded-lg p-8 text-center shadow-lg md:mx-0 md:gap-4">
        {/* logo */}
        <img
          src="/images/logo_gold.avif"
          alt="age verification"
          className="max-h-[70px]"
        />
        {/* title */}
        <PoppinsText
          fontSize="28px"
          style="semibold"
          className="max-w-[500px] text-center text-gold"
        >
          {title}
        </PoppinsText>
        {/* message */}
        <PoppinsText
          fontSize="16px"
          style="semibold"
          className="max-w-[500px] pb-2 text-center text-gold"
        >
          {message}
        </PoppinsText>
        {/* buttons */}
        <div className="flex gap-4">
          {/* exit */}
          <button
            className="flex h-fit flex-col items-center justify-center border border-white bg-black px-3 py-2 hover:bg-gold md:px-9 md:py-3"
            onClick={() => handleVerification(false)}
          >
            <PoppinsText fontSize="16px" className="text-center text-white">
              {exit}
            </PoppinsText>
          </button>
          {/* accept */}
          <button
            className="flex h-fit flex-col items-center justify-center border bg-black px-3 py-2 text-white hover:bg-gold md:px-9 md:py-3"
            onClick={() => handleVerification(true)}
          >
            <PoppinsText fontSize="16px" className="text-center text-white">
              {accept}
            </PoppinsText>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgeVerificationPopup
