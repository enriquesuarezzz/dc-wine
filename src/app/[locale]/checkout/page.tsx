'use client'
import { useState } from 'react'
import { useCart } from '@/components/molecules/cart_context/cart_context'
import { PoppinsText } from '@/components/atoms/poppins_text'
import { loadStripe } from '@stripe/stripe-js'
import { useLocale } from 'next-intl'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

// List of valid postal codes for Lanzarote (Islas Canarias)
const validPostalCodes = [
  '35500',
  '35542',
  '35508',
  '35570',
  '35559',
  '35520',
  '35544',
  '35571',
  '35541',
  '35543',
  '35510',
  '35561',
  '35580',
  '35509',
  '35550',
  '35507',
  '35530',
  '35539',
  '35558',
  '35572',
  '35560',
]

const CheckoutPage = () => {
  const locale = useLocale()
  const { cartItems } = useCart()
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    companyName: '',
    dniNifCif: '',
  })
  const [postalCodeError, setPostalCodeError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingDetails((prev) => ({ ...prev, [name]: value }))

    const errorMessage =
      locale === 'es'
        ? 'Código postal no válido. Por favor, use un código postal válido de Lanzarote.'
        : 'Invalid postal code. Please use a valid Lanzarote postal code.'

    if (name === 'postalCode' && !validPostalCodes.includes(value)) {
      setPostalCodeError(errorMessage)
    } else {
      setPostalCodeError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      return
    }

    if (postalCodeError) {
      return
    }

    try {
      const stripe = await stripePromise
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: cartItems, shippingDetails, locale }),
      })

      const { sessionId } = await res.json()

      if (stripe) {
        await stripe.redirectToCheckout({ sessionId })
      }
    } catch (error) {
      console.error('Error during checkout process:', error) // Log the error to the console
    }
  }

  return (
    <div className="mx-4 flex flex-col justify-between gap-6 pt-24 md:flex-row md:gap-20 md:px-10 md:pt-32 lg:mx-24 lg:px-4">
      {/* Left side - Form */}
      <div className="flex w-full max-w-[700px] flex-col gap-6">
        <PoppinsText fontSize="28px" style="bold">
          {locale === 'es' ? 'Proceso de Compra' : 'Checkout'}
        </PoppinsText>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder={locale === 'es' ? 'Nombre Completo' : 'Full Name'}
            required
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="email"
            name="email"
            placeholder={
              locale === 'es' ? 'Correo Electrónico' : 'Email Address'
            }
            required
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder={
              locale === 'es' ? 'Número de Teléfono' : 'Phone Number'
            }
            required
            pattern="[0-9]{9}"
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="text"
            name="companyName"
            placeholder={
              locale === 'es' ? 'Nombre de la Empresa' : 'Company Name'
            }
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="text"
            name="dniNifCif"
            placeholder={locale === 'es' ? 'DNI/NIE/CIF' : 'DNI/NIE/CIF'}
            required
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="text"
            name="address"
            placeholder={
              locale === 'es' ? 'Dirección de Envío' : 'Shipping Address'
            }
            required
            onChange={handleChange}
            className="rounded border p-2"
          />
          <input
            type="text"
            name="postalCode"
            placeholder={
              locale === 'es'
                ? 'Código Postal (Lanzarote)'
                : 'Postal Code (Lanzarote)'
            }
            required
            pattern="[38][0-9]{4}"
            onChange={handleChange}
            className="rounded border p-2"
          />
          {postalCodeError && (
            <span className="text-sm text-red-500">{postalCodeError}</span>
          )}
          <input
            type="text"
            name="city"
            placeholder={locale === 'es' ? 'Ciudad' : 'City'}
            required
            value={shippingDetails.city}
            onChange={handleChange}
            className="rounded border p-2"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded bg-gray-800 py-2 text-white hover:bg-gray-900"
          >
            <PoppinsText fontSize="16px" className="text-white">
              {locale === 'es' ? 'Proceder al Pago' : 'Proceed to Payment'}
            </PoppinsText>
          </button>
        </form>
      </div>

      {/* Right side - Cart Details */}
      <div className="flex w-full flex-col border-gray-300 pl-6 pr-3 md:max-w-[500px] md:border-l md:pr-0">
        <PoppinsText fontSize="20px" style="bold">
          {locale === 'es' ? 'Detalles del Carrito' : 'Cart Details'}
        </PoppinsText>

        <div className="max-h-80 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p>
              {locale === 'es'
                ? 'Tu carrito está vacío.'
                : 'Your cart is empty.'}
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="mx-0 flex w-full items-center justify-between border-b py-2"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded object-contain"
                />
                <div className="flex flex-col pl-2">
                  <PoppinsText fontSize="16px">{item.name}</PoppinsText>
                  <PoppinsText fontSize="14px">
                    {item.quantity} x ${item.price}
                  </PoppinsText>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-4">
            <p className="text-right font-bold">
              {locale === 'es' ? 'Total: €' : 'Total: $'}
              {(
                cartItems.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0,
                ) * 1.07
              ) // Adding 7% IGIC
                .toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutPage
