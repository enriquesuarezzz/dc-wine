import { Locale, routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import './globals.css'
import Navbar from '@/components/molecules/navbar/navbar'
import { Barlow, Geist_Mono } from 'next/font/google'

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
  title: 'Create Next App',
  description: 'Generated by create next app',
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
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body className={`${BarlowText.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
