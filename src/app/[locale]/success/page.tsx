'use client'
import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Check from '@/components/atoms/svg/check'
import Link from 'next/link'
import { PoppinsText } from '@/components/atoms/poppins_text'

// payment status and get locale
const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const locale = useLocale()

  // check if payment was successful
  useEffect(() => {
    const session_id = new URLSearchParams(window.location.search).get(
      'session_id',
    )

    if (session_id) {
      setPaymentStatus('success')
    } else {
      setPaymentStatus('failure')
    }
  }, [])
  // loading message
  if (paymentStatus === null) {
    return <div className="text-center text-lg">Loading...</div>
  }
  // success and failure messages
  const successMessage =
    locale === 'es'
      ? {
          title: '¡Pago Exitoso!',

          details:
            'Los detalles de tu pedido serán enviados al correo electrónico proporcionado.',
          button: 'Seguir Comprando',
        }
      : {
          title: 'Payment Successful!',

          details: 'Your order details will be sent to the email you provided.',
          button: 'Continue Shopping',
        }

  const failureMessage =
    locale === 'es'
      ? {
          title: 'Pago Fallido',
          description: 'Algo salió mal. Por favor, inténtalo nuevamente.',
        }
      : {
          title: 'Payment Failed',
          description: 'Something went wrong. Please try again.',
        }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 pt-32">
      {/*  success message */}
      {paymentStatus === 'success' ? (
        <div className="flex w-full max-w-2xl flex-col items-center justify-center rounded-lg p-8">
          {/* success icon */}
          <Check />
          {/* success title */}
          <PoppinsText
            fontSize="28px"
            style="semibold"
            className="pt-3 text-center"
          >
            {successMessage.title}
          </PoppinsText>
          {/* success details */}
          <div className="mt-4">
            <PoppinsText fontSize="16px" className="text-center text-gray-700">
              {successMessage.details}
            </PoppinsText>
            {/* continue shopping button */}
            <div className="mt-4 text-center">
              <Link href="/">
                <button className="mt-3 w-full rounded bg-gray-800 py-2 text-white hover:bg-gray-900">
                  <PoppinsText fontSize="14px" className="text-white">
                    {successMessage.button}
                  </PoppinsText>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // failure message
        <div className="w-full max-w-2xl rounded-lg bg-white p-8">
          {/* failure title */}
          <PoppinsText
            fontSize="28px"
            style="semibold"
            className="pt-3 text-center text-red-600"
          >
            {failureMessage.title}
          </PoppinsText>
          {/* failure description */}
          <PoppinsText
            fontSize="16px"
            className="pt-5 text-center text-gray-700"
          >
            {failureMessage.description}
          </PoppinsText>
        </div>
      )}
    </div>
  )
}

export default SuccessPage
