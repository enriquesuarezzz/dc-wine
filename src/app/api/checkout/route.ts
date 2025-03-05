import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

export async function POST(req: NextRequest) {
  try {
    const { products, locale } = await req.json() // Get the locale from the request

    const line_items = products.map((product: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100, // Convert price to cents
      },
      quantity: product.quantity,
    }))

    // Dynamically generate success and cancel URLs based on the locale
    const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/cart`

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
