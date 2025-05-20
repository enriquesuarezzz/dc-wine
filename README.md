# NextJS + Tailwind CSS Ecommerce with Firebase and Stripe

This is a Next.js eCommerce application designed for selling red wine, white wine, and sparkling wines. It uses Firebase as the database and Stripe for processing payments.

## 🚀 Features

- **Product Management**: Manage and display wines (red, white, sparkling) stored in Firebase.
- **Cart Functionality**: Add products to a cart, view cart items, and proceed to checkout.
- **Stripe Payments**: Secure payment processing via Stripe.
- **Order Email Notifications:**:
   - Customers receive a confirmation email after purchasing.
   - Store owner receives a notification email for each new order.
- **Responsive Design**: Fully responsive UI for both desktop and mobile users.

## 📦 Tech Stack

- **Frontend**: Next.js, React
- **Database**: Firebase Firestore
- **Payments**: Stripe API
- **Styling**: Tailwind CSS 

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/enriquesuarezzz/dc-wine.git
cd dc-wine
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Firebase
Create a Firebase project and add Firebase configuration to your project.

Go to the Firebase Console
Create a new project and set up Firestore.
Create a Firebase service account and add the credentials to the project.
Install Firebase SDK:

```bash
npm install firebase
```

Add Firebase config in .env.local:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Set up Stripe
Create a Stripe account: Stripe
Get your Publishable Key and Secret Key from the Stripe dashboard.
Install Stripe dependencies:
```bash
npm install stripe
```

Add your Stripe keys to .env.local:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-publishable-key
STRIPE_SECRET_KEY=your-secret-key
```

 ### 5. Set up Nodemailer

You will need an SMTP service (like Gmail, SendGrid, or any other) to send emails.
Install Nodemailer:

 ```bash
npm install nodemailer
 ```
 Add email configuration to your .env.local:
  ```bash
BASE_URL=http://localhost:3000  (update for production)
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
 ```


 ### 6. Run the Development Server
 ```bash
 npm run dev
 ```
 This will start the Next.js development server at http://localhost:3000.

🧠 Firebase Setup
For Firestore, create a collection for storing wine products. Each product can have the following structure:
```bash
{
  "id": "unique-id",
  "name": "Wine Name",
  "description": "Wine Description",
  "price": 100,
  "image_url": "https://example.com/wine-image.jpg",
  "type": "red | white | sparkling"
}
 ```

### 💸 Stripe Integration
The Stripe integration allows users to complete their orders by securely entering their payment information.

Frontend: The user adds wines to the cart, proceeds to checkout, and submits payment via Stripe.
Backend: The payment is processed via the Stripe API. After successful payment, the order is confirmed.

### 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
