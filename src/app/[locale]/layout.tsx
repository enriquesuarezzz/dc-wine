import { Locale, routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/molecules/navbar/navbar'
import { Barlow, Geist_Mono } from 'next/font/google'
import Footer from '@/components/molecules/footer/footer'
import { CartProvider } from '@/components/molecules/cart_context/cart_context'
import CookiesPopup from '@/components/molecules/cookies_pop_up/cookies_pop_up'
import Analytics from '@/components/molecules/analytics/analytics'
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/../lib/gtag'

const BarlowText = Barlow({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-barlow',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'DcWine',
  description:
    'Welcome to DcWine, your trusted platform to discover and purchase the finest wines, directly from the best wineries.',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // Get all translations (messages)
  const messages = await getMessages()

  // Fetch translations for the navbar specifically
  const navbarTranslations = messages.navbar as {
    home: string
    about_us: string
    products: string
    select_language: string
    search_bar: {
      search_placeholder: string
      no_results: string
    }
    cart: {
      title: string
      empty: string
      remove: string
      quantity: string
      subtotal: string
    }
  }

  const cookiesTranslations = messages.cookies_popup as {
    title: string
    message: string
    accept: string
    reject: string
  }

  return (
    <html lang={locale}>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_path: window.location.pathname,
      });
    `,
        }}
      />
      <body className={`${BarlowText.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Navbar translations={navbarTranslations} />
            <main className="flex-1">{children}</main>
          </CartProvider>
          <CookiesPopup translations={cookiesTranslations} />
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
