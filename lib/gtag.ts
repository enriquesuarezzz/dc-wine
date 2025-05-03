export const GA_MEASUREMENT_ID = 'G-VXXJKMVXDW'

declare global {
  interface Window {
    gtag: (...args: [string, string, Record<string, unknown>?]) => void
  }
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}
