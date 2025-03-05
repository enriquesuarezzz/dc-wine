'use client'

import { useState, useEffect } from 'react'

const SuccessPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)

  useEffect(() => {
    // Simulate payment success
    const session_id = new URLSearchParams(window.location.search).get(
      'session_id',
    )

    if (session_id) {
      setPaymentStatus('success')
    } else {
      setPaymentStatus('failure')
    }
  }, [])

  if (paymentStatus === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      {paymentStatus === 'success' ? (
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-green-600">
            Payment Successful!
          </h1>
          <p className="mt-2 text-center text-xl text-gray-700">
            Thank you for your purchase!
          </p>

          <div className="mt-8">
            <p className="text-center text-lg text-gray-700">
              Your order details will be sent to the email you provided.
            </p>
            <div className="mt-6 text-center">
              <button className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
          <h1 className="text-center text-3xl font-bold text-red-600">
            Payment Failed
          </h1>
          <p className="mt-2 text-center text-xl text-gray-700">
            Something went wrong. Please try again.
          </p>
        </div>
      )}
    </div>
  )
}

export default SuccessPage
