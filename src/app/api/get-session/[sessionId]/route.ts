import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url) // Extract query params
  const sessionId = searchParams.get('sessionId') // Get sessionId

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return NextResponse.json(session, { status: 200 })
  } catch (error) {
    console.error('Error retrieving session:', error) // Log the error
    return NextResponse.json({ error: 'Session not found' }, { status: 400 })
  }
}
