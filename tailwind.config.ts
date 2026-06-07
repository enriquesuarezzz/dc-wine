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
        light_gold: '#f9f2d2',
        gold: '#e5ca3a',
        hover_gold: '#f0cc0d',
        mate_black: '#111111',
      },
    },
  },
  plugins: [],
} satisfies Config
