
# Sabor Volcánico 🌋  
**Next.js + Tailwind CSS Ecommerce with Firebase and Stripe**

**Sabor Volcánico** is a modern eCommerce platform built with Next.js for selling gourmet products from the Canary Islands — including mojo sauces, gofio, cheeses, wines, and more. It uses **Firebase** for product and order management and **Stripe** for secure payment processing.

## 🚀 Feature

- **Product Catalog**: Manage and display a wide range of Canarian food products.
- **Shopping Cart**: Add products to a cart, view item details, adjust quantities, and checkout.
- **Stripe Payments**: Secure and seamless payments using the Stripe API.
- **Order Email Notifications**:
  - Customers receive a confirmation email after successful checkout.
  - Store owners are notified of each new order via email.
- **Responsive Design**: Optimized for desktop and mobile devices with a clean Tailwind UI.

## 📦 Tech Stack

- **Frontend**: Next.js, React
- **Database**: Firebase Firestore
- **Payments**: Stripe API
- **Email Service**: Nodemailer with SMTP
- **Styling**: Tailwind CSS

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/enriquesuarezzz/sabor-volcanico.git
cd sabor-volcanico
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase

- Go to the [Firebase Console](https://console.firebase.google.com/)
- Create a new project and enable **Firestore**.
- Generate a service account and download the credentials (used in your backend logic if needed).
- Install Firebase:

```bash
npm install firebase
```

- Add Firebase config to your `.env.local`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Set Up Stripe

- Create a [Stripe account](https://stripe.com).
- Get your **Publishable Key** and **Secret Key**.
- Install Stripe:

```bash
npm install stripe
```

- Add Stripe credentials to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
```

### 5. Set Up Nodemailer

- Choose an SMTP provider (Gmail, SendGrid, etc.)
- Install Nodemailer:

```bash
npm install nodemailer
```

- Add email configuration to `.env.local`:

```bash
BASE_URL=http://localhost:3000   # Update this in production
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 6. Run the Development Server

```bash
npm run dev
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Firebase Product Schema

Create a `products` collection in Firestore. Each document can include:

```json
{
  "id": "Unique id",
  "name": "Product Name",
  "description": "Product Description",
  "price": Product Price,
  "image": "image Url",
  "category": "Product category"
}
```

---

## 💸 Stripe Integration

- **Frontend**: Users add Canarian products to the cart and complete the purchase through a Stripe checkout session.
- **Backend**: The server handles Stripe webhook events to confirm payments and send out confirmation emails.

---

## 📧 Email Notifications

After a successful order:

- A **confirmation email** is sent to the buyer with order details.
- A **notification email** is sent to the store administrator with customer info and items purchased.

---

## 📄 License

This project is licensed under the **MIT License** — see the LICENSE file for more details.
