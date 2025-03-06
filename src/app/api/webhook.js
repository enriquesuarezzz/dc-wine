// pages/api/webhook.js
import { buffer } from 'micro'
import * as admin from 'firebase-admin'
import { sendEmail } from '../../lib/nodemailer'

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET // Stripe endpoint secret for your webhook

export const config = {
  api: {
    bodyParser: false, // Stripe sends raw body
  },
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async (req, res) => {
  const sig = req.headers['stripe-signature']
  const reqBuffer = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, endpointSecret)
  } catch (err) {
    console.log('Webhook signature verification failed.')
    return res.status(400).send(`Webhook error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      const { customer_email, id: sessionId, metadata } = session

      // Example: Get purchase details from metadata or the session object
      const purchasedItems = metadata.purchasedItems || 'No items provided'

      // Send email with the purchase details
      const subject = `Purchase Confirmation: ${sessionId}`
      const text = `Thank you for your purchase!\n\nDetails:\n\nItems Purchased: ${purchasedItems}\n\nSession ID: ${sessionId}`
      await sendEmail(customer_email, subject, text)

      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
}
