import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export async function GET(
  request: Request,
  { params }: { params: { sessionId: string } },
) {
  const { sessionId } = params

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return new Response(JSON.stringify(session), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Session not found' }), {
      status: 400,
    })
  }
}
