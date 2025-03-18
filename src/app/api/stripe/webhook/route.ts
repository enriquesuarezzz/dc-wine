import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { firestore } from 'firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

const admin = require('firebase-admin')
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // Add your Firebase Project ID here
  })
}
const db = admin.firestore()

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string
  const body = await req.text()

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err}`)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const sessionId = session.id

    try {
      const sessionDetails = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ['line_items'],
        },
      )

      // Verificar si existen los line_items
      const lineItems = sessionDetails.line_items?.data

      if (!lineItems) {
        throw new Error('No line items found')
      }

      for (const item of lineItems) {
        // Verificar si item.price y item.quantity son válidos
        const productId = item.price?.product
        if (!productId) {
          throw new Error('Product ID not found in item price')
        }

        const quantityPurchased = item.quantity
        if (quantityPurchased === null || quantityPurchased === undefined) {
          throw new Error('Quantity purchased is invalid')
        }

        const productRef = db.collection('products').doc(productId)

        const productDoc = await productRef.get()
        if (!productDoc.exists) {
          throw new Error(`Product with ID ${productId} not found`)
        }

        const productData = productDoc.data()

        if (productData?.stock >= quantityPurchased) {
          const newStock = productData?.stock - quantityPurchased

          await productRef.update({
            stock: newStock,
          })
        } else {
          console.error(`Insufficient stock for product ${productId}`)
        }
      }

      // Successfully handled the webhook
      return NextResponse.json({ received: true })
    } catch (error) {
      // Log the error properly
      if (error) {
        console.error(
          'Error updating stock:',
          error instanceof Error ? error.message : error,
        )
      } else {
        console.error('Error: No error object was thrown.')
      }

      // Return error response
      return NextResponse.json(
        { error: 'Failed to update stock' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
