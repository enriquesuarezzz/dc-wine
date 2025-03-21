import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendEmail } from '@/../lib/nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

// Define a Type for the CartItem
type CartItem = {
  name: string
  quantity: number
  price: number
  image: string
}

export async function POST(req: NextRequest) {
  try {
    const { products, locale, shippingDetails } = await req.json()

    const line_items = products.map((product: CartItem) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }))

    const successUrl = `${process.env.BASE_URL}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.BASE_URL}/${locale}/cart`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product_ids: products
          .map((product: CartItem, index: number) => `${product.name}-${index}`)
          .join(','),
      },
    })

    // Calculate total price
    const totalPrice = products.reduce(
      (total: number, product: CartItem) =>
        total + product.price * product.quantity,
      0, // Initial total value
    )

    // Conditional content based on the locale
    const greeting =
      locale === 'es'
        ? `Estimado ${shippingDetails.name},`
        : `Dear ${shippingDetails.name},`
    const thankYouMessage =
      locale === 'es'
        ? '¡Gracias por tu pedido! Aquí están los detalles:'
        : 'Thank you for your order! Here are the details:'
    const shippingInfoTitle =
      locale === 'es' ? 'Información de envío:' : 'Shipping Information:'
    const phoneLabel = locale === 'es' ? 'Teléfono:' : 'Phone:'
    const companyNameLabel =
      locale === 'es' ? 'Nombre de la empresa:' : 'Company Name:'
    const dniNifCifLabel = locale === 'es' ? 'DNI/NIE/CIF:' : 'DNI/NIE/CIF:'
    const addressLabel = locale === 'es' ? 'Dirección:' : 'Address:'
    const cityLabel = locale === 'es' ? 'Ciudad:' : 'City:'
    const postalCodeLabel = locale === 'es' ? 'Código Postal:' : 'Postal Code:'
    const totalPriceLabel = locale === 'es' ? 'Precio total:' : 'Total Price:'
    const productHeader = locale === 'es' ? 'Producto' : 'Product'
    const quantityHeader = locale === 'es' ? 'Cantidad' : 'Quantity'
    const priceHeader = locale === 'es' ? 'Precio' : 'Price'
    const totalHeader = locale === 'es' ? 'Total' : 'Total'

    const contactUsMessage =
      locale === 'es'
        ? 'Te notificaremos una vez que tu pedido haya sido enviado. Si tienes alguna pregunta, contáctanos.'
        : 'We will notify you once your order has been shipped. If you have any questions, please contact us.'

    // Create HTML email content
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
          <div style="text-align: center; background-color: #000000; padding: 20px;">
            <img src="https://i.postimg.cc/Qtd0505V/DCWine-Gold.png" alt="DC Wine Logo" style="width: 120px; height: auto;" />
          </div>

          <div style="padding: 20px; max-width: 800px; margin: auto; background-color: #ffffff; border-radius: 8px; color: #333; margin-top: 20px; margin-bottom: 20px;">
            <p>${greeting}</p>
            <p>${thankYouMessage}</p>

            <table border="1" cellpadding="5" style="width: 100%; border-collapse: collapse; margin-top: 20px; color: #333;">
              <thead>
                <tr>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">${productHeader}</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">${quantityHeader}</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">${priceHeader}</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">${totalHeader}</th>
                </tr>
              </thead>
              <tbody>
                ${products
                  .map(
                    (product: CartItem) => `
                      <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>€${product.price}</td>
                        <td>€${(product.quantity * product.price).toFixed(2)}</td>
                      </tr>`,
                  )
                  .join('')}
              </tbody>
            </table>

            <p><strong>${totalPriceLabel} €${totalPrice.toFixed(2)}</strong></p>

            <p><strong>${shippingInfoTitle}</strong></p>
            <ul>
            <li><strong>${phoneLabel}</strong> ${shippingDetails.phone}</li>
              <li><strong>${companyNameLabel}</strong> ${shippingDetails.companyName}</li>
              <li><strong>${dniNifCifLabel}</strong> ${shippingDetails.dniNifCif}</li>
              <li><strong>${addressLabel}</strong> ${shippingDetails.address}</li>
              <li><strong>${cityLabel}</strong> ${shippingDetails.city}</li>
              <li><strong>${postalCodeLabel}</strong> ${shippingDetails.postalCode}</li>
            </ul>

            <p>${contactUsMessage}</p>
            <p style="color: #888; font-size: 12px;">Best regards, <br> DC Wine Team</p>
          </div>
        </body>
      </html>
    `

    // Send confirmation emails to the user and store owner
    await sendEmail(
      shippingDetails.email,
      locale === 'es' ? 'Detalles de tu compra' : 'Your Purchase Details',
      '',
      htmlContent,
    )
    await sendEmail(
      process.env.EMAIL_USER as string,
      locale === 'es'
        ? 'Notificación de nueva compra'
        : 'New Purchase Notification',
      '',
      htmlContent,
    )

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout Error:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 },
    )
  }
}
