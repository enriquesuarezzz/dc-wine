import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { firestore } from 'firebase-admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

// Ensure Firebase Admin SDK is initialized properly
const admin = require('firebase-admin')
if (!admin.apps.length) {
  const serviceAccount = {
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID!,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID!,
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL!,
    client_id: process.env.FIREBASE_CLIENT_ID!,
    auth_uri: process.env.FIREBASE_AUTH_URI!,
    token_uri: process.env.FIREBASE_TOKEN_URI!,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL!,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL!,
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  })
}

const db = admin.firestore()

// Stripe Webhook Handler
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string
  const body = await req.text()

  let event

  // Verify the Stripe webhook signature
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err}`)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 },
    )
  }

  // Handle only the checkout session completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const sessionId = session.id

    try {
      // Get detailed session info, including line items
      const sessionDetails = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ['line_items.data.price.product'],
        },
      )

      const lineItems = sessionDetails.line_items?.data || []

      if (lineItems.length === 0) {
        throw new Error('No line items found in the session.')
      }

      // Loop through each purchased product and update stock
      for (const item of lineItems) {
        const productId =
          typeof item.price?.product === 'string'
            ? item.price.product
            : item.price?.product?.id
        const quantityPurchased = item.quantity

        if (!productId || !quantityPurchased) {
          console.error('Invalid product ID or quantity:', {
            productId,
            quantityPurchased,
          })
          continue
        }

        console.log(
          `Updating stock for product ${productId}, quantity: ${quantityPurchased}`,
        )

        const productRef = db.collection('products_en').doc(productId)
        const productDoc = await productRef.get()

        if (!productDoc.exists) {
          console.error(`Product with ID ${productId} not found in Firestore`)
          continue
        }

        const productData = productDoc.data()

        // Ensure stock is valid
        const currentStock = productData?.stock ?? 0

        if (currentStock >= quantityPurchased) {
          const newStock = currentStock - quantityPurchased

          await productRef.update({ stock: newStock })

          console.log(
            `Stock updated for product ${productId}: ${newStock} remaining`,
          )
        } else {
          console.error(`Insufficient stock for product ${productId}`)
        }
      }

      // Successfully handled the webhook
      return NextResponse.json({ received: true })
    } catch (error) {
      console.error(
        'Error updating stock:',
        error instanceof Error ? error.message : error,
      )

      return NextResponse.json(
        { error: 'Failed to update stock' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
