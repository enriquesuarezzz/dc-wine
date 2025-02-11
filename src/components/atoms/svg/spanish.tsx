import { SVGProps } from 'react'

export default function Spanish(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512 512"
      {...props}
    >
      <mask id="IconifyId194dcd104b44aa6ac1">
        <circle cx="256" cy="256" r="256" fill="#fff" />
      </mask>
      <g mask="url(#IconifyId194dcd104b44aa6ac1)">
        <path
          fill="#d80027"
          d="M0 0h512v128l-39.8 130.3L512 384v128H0V384l37.8-124L0 128z"
        />
        <path fill="#ffda44" d="M0 128h512v256H0z" />
      </g>
    </svg>
  )
}
