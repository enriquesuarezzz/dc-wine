'use client'
import { Barlow } from 'next/font/google'
import { forwardRef, useEffect, useRef } from 'react'

export const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
})

export interface BarlowTextProps {
  text: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  style?: 'light' | 'normal' | 'semibold' | 'bold'
  fontSize?: '16px' | '19px' | '22px' | '32px'
  leading?: 'normal' | 'none' | 'tight' | 'snug' | 'relaxed' | 'loose'
  className?: string
}

export const BarlowText = forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  BarlowTextProps
>(
  (
    {
      text,
      tag = 'p',
      style = 'regular',
      fontSize = '16px',
      className = 'text-black',
      leading = 'normal',
    },
    ref, // Include the ref parameter here
  ) => {
    const textContent = useRef<HTMLParagraphElement>(null)
    useEffect(() => {
      if (textContent.current) {
        textContent.current.innerHTML = text
      }
    }, [text])

    function getSize() {
      switch (fontSize) {
        case '16px':
          return 'text-[14px] md:text-[16px]'
        case '19px':
          return 'text-[14px] md:text-[16px] lg:text-[19px]'
        case '22px':
          return 'text-[20px] md:text-[22px]'
        case '32px':
          return 'text-[22px] md:text-[32px]'
      }
    }

    function getStyle() {
      switch (style) {
        case 'light':
          return 'font-light'
        case 'normal':
          return 'font-normal'
        case 'semibold':
          return 'font-semibold'
        case 'bold':
          return 'font-bold'
      }
    }

    function getLeading() {
      switch (leading) {
        case 'normal':
          return 'leading-normal'
        case 'none':
          return 'leading-none'
        case 'tight':
          return 'leading-tight'
        case 'snug':
          return 'leading-snug'
        case 'relaxed':
          return 'leading-relaxed'
        case 'loose':
          return 'leading-loose'
      }
    }

    let globalStyle = `${barlow.className} ${getSize()} ${getLeading()} ${getStyle()} antialiased`

    function getTag() {
      switch (tag) {
        case 'h1':
          return (
            <h1 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h1>
          )
        case 'h2':
          return (
            <h2 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h2>
          )
        case 'h3':
          return (
            <h3 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h3>
          )
        case 'h4':
          return (
            <h4 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h4>
          )
        case 'h5':
          return (
            <h5 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h5>
          )
        case 'h6':
          return (
            <h6 ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </h6>
          )
        case 'p':
          return (
            <p ref={ref} className={`${globalStyle} ${className}`}>
              {text}
            </p>
          )
      }
    }

    return <>{getTag()}</>
  },
)

BarlowText.displayName = 'BarlowText'
