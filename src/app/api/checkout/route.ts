import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '../../../../lib/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

// Define a Type for the CartItem
type CartItem = {
  name: string
  quantity: number
  price: number
  imageUrl: string
}

export async function POST(req: NextRequest) {
  try {
    const { products, locale, shippingDetails } = await req.json()

    const igicRate = 0.07 // 7% IGIC

    const line_items = products.map((product: CartItem) => {
      const priceWithIGIC = product.price * (1 + igicRate) // product price with IGIC

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: Math.round(priceWithIGIC * 100),
        },
        quantity: product.quantity,
      }
    })

    // Store the full order data in Firestore
    const ordersRef = collection(db, 'orders')
    const orderRef = await addDoc(ordersRef, {
      status: 'pending',
      products,
      shippingDetails,
      locale,
      createdAt: serverTimestamp(), // Use serverTimestamp to set the creation time
    })

    const orderId = orderRef.id

    const successUrl = `${process.env.BASE_URL}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${process.env.BASE_URL}/${locale}/cart`

    // Create the Stripe session with the orderId stored in metadata
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId, // Store just the order ID in metadata
        locale,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error)

    return new NextResponse(
      JSON.stringify({ error: 'Error creating checkout session' }),
      { status: 500 },
    )
  }
}
