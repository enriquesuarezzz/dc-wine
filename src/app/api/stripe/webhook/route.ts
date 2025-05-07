import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import admin from 'firebase-admin'
import { ServiceAccount } from 'firebase-admin/app'
import { sendEmail } from '@/../lib/nodemailer'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
})

type CartItem = {
  name: string
  quantity: number
  price: number
  image: string
}

// Initialize Firebase Admin SDK if not already initialized
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
  } as ServiceAccount

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  })
}

const db = admin.firestore()

// Stripe Webhook Handler
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') ?? ''
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ''
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
        const productName: string = item.description ?? 'unknown-product'
        const quantityPurchased = item.quantity ?? 0

        if (!productName || quantityPurchased <= 0) {
          console.error('Invalid product name or quantity:', {
            productName,
            quantityPurchased,
          })
          continue
        }

        // Search for product document by product name
        const productQuerySnapshot = await db
          .collection('products_en')
          .where('name', '==', productName) // Assuming product name is stored in Firestore as 'name'
          .get()

        if (productQuerySnapshot.empty) {
          console.error(
            `Product with name ${productName} not found in Firestore`,
          )
          continue
        }

        // Assuming there's only one product matching the name
        const productDoc = productQuerySnapshot.docs[0]
        const productCode = productDoc.id // Firestore document ID is the product code
        const productData = productDoc.data()

        // Ensure stock is valid
        const currentStock = productData?.stock ?? 0

        if (currentStock >= quantityPurchased) {
          const newStock = currentStock - quantityPurchased
          await productDoc.ref.update({ stock: newStock })
        } else {
          console.error(
            `Insufficient stock for product ${productCode} (name: ${productName})`,
          )
        }
      }

      const orderMetadata = sessionDetails.metadata || {}
      const orderId = orderMetadata.orderId

      // Retrieve the order details from Firebase using the orderId
      const orderDoc = await db.collection('orders').doc(orderId).get()
      const orderData = orderDoc.data()

      if (!orderData) {
        throw new Error('Order not found')
      }

      const products = orderData.products
      const shippingDetails = orderData.shippingDetails

      // Mark order as completed in Firestore
      const orderRef = db.collection('orders').doc(sessionId)
      await orderRef.set({
        status: 'completed',
        sessionId,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total! / 100,
        currency: session.currency,
        lineItems: lineItems.map((item) => ({
          description: item.description,
          quantity: item.quantity,
        })),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })

      const metadata = sessionDetails.metadata || {}
      const locale = metadata.locale || 'en'

      // Reuse `shippingDetails` and `products` for the email content
      const greeting =
        locale === 'es'
          ? `Estimado ${shippingDetails.name},`
          : `Dear ${shippingDetails.name},`
      const thankYouMessage =
        locale === 'es'
          ? '¡Gracias por tu pedido! Aquí están los detalles:'
          : 'Thank you for your order! Here are the details:'

      const contactUsMessage =
        locale === 'es'
          ? 'Te notificaremos una vez que tu pedido haya sido enviado. Si tienes alguna pregunta, contáctanos.'
          : 'We will notify you once your order has been shipped. If you have any questions, please contact us.'

      // Calculate total price
      const totalPrice = products.reduce(
        (total: number, product: CartItem) =>
          total + product.price * product.quantity,
        0,
      )

      // Create HTML email content
      const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
          <div style="text-align: center; background-color: #000000; padding: 20px;">
            <img src="https://brgtigvjaxugtmbaaadp.supabase.co/storage/v1/object/public/images//logo_gold.avif" alt="DC Wine Logo" style="width: 120px; height: auto;" />
          </div>

          <div style="padding: 20px; max-width: 800px; margin: auto; background-color: #ffffff; border-radius: 8px; color: #333; margin-top: 20px; margin-bottom: 20px;">
            <p>${greeting}</p>
            <p>${thankYouMessage}</p>

            <table border="1" cellpadding="5" style="width: 100%; border-collapse: collapse; margin-top: 20px; color: #333;">
              <thead>
                <tr>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">Product</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">Quantity</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">Price</th>
                  <th style="background-color: #000000; color: white; text-align: left; padding: 8px;">Total</th>
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

            <p><strong>Total Price: €${totalPrice.toFixed(2)}</strong></p>

            <p><strong>Shipping Information:</strong></p>
            <ul>
              <li><strong>Phone:</strong> ${shippingDetails.phone}</li>
              <li><strong>Company Name:</strong> ${shippingDetails.companyName}</li>
              <li><strong>DNI/NIE/CIF:</strong> ${shippingDetails.dniNifCif}</li>
              <li><strong>Address:</strong> ${shippingDetails.address}</li>
              <li><strong>City:</strong> ${shippingDetails.city}</li>
              <li><strong>Postal Code:</strong> ${shippingDetails.postalCode}</li>
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

      // Successfully handled the webhook
      return NextResponse.json({ received: true })
    } catch (error) {
      console.error(
        'Error handling webhook:',
        error instanceof Error ? error.message : error,
      )
      return NextResponse.json(
        { error: 'Failed to update stock or process order' },
        { status: 500 },
      )
    }
  }

  return NextResponse.json({ received: true })
}
