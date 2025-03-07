import { buffer } from 'micro'
import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'
import { sendEmail } from '@/../lib/nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string

export const config = {
  api: {
    bodyParser: false, // Stripe sends raw body
  },
}

// Define the type for the session object returned by Stripe
interface StripeCheckoutSession {
  customer_email: string
  id: string
  metadata: {
    purchasedItems?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const sig = req.headers['stripe-signature']
  const reqBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig as string,
      endpointSecret,
    )
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return res
      .status(400)
      .send(
        `Webhook error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      )
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as StripeCheckoutSession
      const { customer_email, id: sessionId, metadata } = session

      const purchasedItems = metadata?.purchasedItems || 'No items provided'
      const subject = `Purchase Confirmation: ${sessionId}`
      const text = `Thank you for your purchase!\n\nDetails:\n\nItems Purchased: ${purchasedItems}\n\nSession ID: ${sessionId}`
      const html = ` 
          <p>Thank you for your purchase!</p>
          <p><strong>Items Purchased:</strong> ${purchasedItems}</p>
          <p><strong>Session ID:</strong> ${sessionId}</p>
        `

      if (customer_email) {
        await sendEmail(customer_email, subject, text, html)
      }

      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
}
