import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': {
      en: '/',
      es: '/',
    },
    '/about_us': {
      en: '/about_us',
      es: '/sobre_nosotros',
    },
    '/products': {
      en: '/products',
      es: '/productos',
    },
    '/privacy_policy': {
      en: '/privacy_policy',
      es: '/politica_de_privacidad',
    },
    '/cookies_policy': {
      en: '/cookies_policy',
      es: '/politica_de_cookies',
    },
    '/cart': {
      en: '/cart',
      es: '/carrito',
    },
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number]
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
