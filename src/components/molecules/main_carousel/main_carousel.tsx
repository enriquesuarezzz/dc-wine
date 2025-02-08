'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { BarlowText } from '@/components/atoms/barlow_text'

export default function MainCarousel() {
  const slides = [
    {
      color: 'bg-[#b7e3f3]',
      text: 'Deleita tu paladar con los <br/> mejores vinos importados desde Italia',
    },
    { color: 'bg-[#b7f3e4]', text: 'Hello Worlddd ' },
    { color: 'bg-[#eaf3b7]', text: 'Hello Worlddddd' },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center px-72">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-[300px] w-full md:h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={`rounded-3xl ${slide.color}`}>
            <BarlowText tag="h1" fontSize="32px" style="bold">
              <span dangerouslySetInnerHTML={{ __html: slide.text }} />
            </BarlowText>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
