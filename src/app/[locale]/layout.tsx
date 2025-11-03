import type { Metadata } from 'next'
import { Locale, routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'DcWine',
  description:
    'Welcome to DcWine, your trusted platform to discover and purchase the finest wines, directly from the best wineries.',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  // Next's generated LayoutProps expects params to be a Promise or undefined
  params?: Promise<{ locale: Locale }>
}) {
  // Await the params (works for Promises and plain objects at runtime)
  const awaited = (await params) as { locale: Locale } | undefined
  // If Next passed a plain object at runtime, it won't be typed as such here,
  // so also check the raw value via a cast to any.
  const runtimeParams = params as unknown as { locale?: Locale }
  const locale = awaited?.locale ?? runtimeParams?.locale

  if (!locale || !routing.locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
