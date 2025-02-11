import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        custom_gray: '#737373',
        light_orange: '#fff3e3',
        dark_orange: '#b98e2f',
        darker_orange: '#b98e2f',
        hover_orange: '#cf9b25',
      },
    },
  },
  plugins: [],
} satisfies Config
