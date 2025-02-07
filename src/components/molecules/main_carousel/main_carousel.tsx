'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

export default function MainCarousel() {
  const images = [
    '/images/carousel/slide_1.avif',
    '/images/carousel/slide_2.avif',
    '/images/carousel/slide_3.avif',
    '/images/carousel/slide_1.avif',
    '/images/carousel/slide_2.avif',
  ]

  return (
    <div className="relative w-full max-w-[1280px]">
      <Swiper
        modules={[Pagination, Autoplay, EffectCoverflow]}
        spaceBetween={-20} // Reduce spacing between slides
        slidesPerView={1.5} // More than 1 to show partial slides on sides
        pagination={{ clickable: true }}
        autoplay={{ delay: 2600 }}
        loop
        centeredSlides
        effect="coverflow"
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: -80, // Negative value creates curve effect
          depth: 250, // Higher depth to enhance perspective
          modifier: 1.2, // Adjusts intensity
          slideShadows: false, // Remove shadows for cleaner look
        }}
        className="mx-auto w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={900}
              height={500}
              className="h-[500px] w-[800px] max-w-[1280px] rounded-lg object-cover transition-transform duration-300 ease-in-out"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
