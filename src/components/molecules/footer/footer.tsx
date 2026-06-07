import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Instagram from '@/components/atoms/svg/instagram'
import Facebook from '@/components/atoms/svg/facebook'
import Phone from '@/components/atoms/svg/phone'
import Whatsapp from '@/components/atoms/svg/whatsapp'
import Image from 'next/image'

export default async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer className="bottom-0 mt-10 w-full items-center bg-mate_black md:mt-12 lg:mt-20">
      <div className="mx-auto max-w-screen-xl items-center p-4 md:py-8">
        {/* Navigation Links */}
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2 mt-2 grid w-full grid-cols-2 items-center justify-center gap-3 text-center md:mt-0 md:flex md:gap-10">
            {/* Home Link */}
            <Link href="/">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('home')}
              </PoppinsText>
            </Link>
            {/* About Us Link */}
            <Link href="/about_us">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('about_us')}
              </PoppinsText>
            </Link>
            {/* Products Link */}
            <Link href="/products">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('products')}
              </PoppinsText>
            </Link>
            {/* Cookies Link */}
            <Link href="/cookies_policy">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('cookies')}
              </PoppinsText>
            </Link>
            {/* Privacy Policy Link */}
            <Link href="/privacy_policy">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('privacy')}
              </PoppinsText>
            </Link>
            {/* Terms and conditions Link */}
            <Link href="/terms_and_conditions">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative mx-auto block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('terms_and_conditions')}
              </PoppinsText>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-3 border-white lg:my-8" />
        {/* Social Media Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:gap-6 md:pt-4">
          {/* Phone Link */}
          <a
            href="tel:+34828042420"
            target="_blank"
            rel="noopener noreferrer"
            className="my-auto flex h-6 items-start md:h-5 md:items-center"
          >
            {/* Phone Icon */}
            <Phone
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
            {/* Phone Number */}
            <PoppinsText
              fontSize="16px"
              style="bold"
              className="relative block w-fit pl-2 text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
            >
              +34 828042420
            </PoppinsText>
          </a>
          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/dcwinecanarias?eid=ARCiLm_76uwbT789OTJKO48fu5eH51VEiYHJn_R2Ifi2RZ09y8UqBEQR1OpbQAvxHcQmjeQMsO7yOkVS#"
            className="my-auto h-6 items-start md:h-5 md:items-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DC Wine Facebook"
          >
            {/* Facebook Icon */}
            <Facebook
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
          </a>
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/dcwinelanzarote/"
            target="_blank"
            rel="noopener noreferrer"
            className="my-auto h-6 items-start md:h-5 md:items-center"
            aria-label="DC Wine Instagram"
          >
            {/* Instagram Icon */}
            <Instagram
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
          </a>
          {/* Whatsapp Link */}
          <a
            href="https://wa.me/672652638"
            target="_blank"
            rel="noopener noreferrer"
            className="my-auto flex h-6 items-start md:h-5 md:items-center"
          >
            {/* Whatsapp Icon */}
            <Whatsapp
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
            {/* Whatsapp Number */}
            <PoppinsText
              fontSize="16px"
              style="bold"
              className="relative block w-fit pl-2 text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
            >
              672652638
            </PoppinsText>
          </a>
        </div>

        {/* Second Divider */}
        <div className="flex justify-center">
          <hr className="mt-4 w-32 border-white md:mt-8" />
        </div>

        <div className="flex items-center justify-center gap-6 pt-4">
          <PoppinsText fontSize="16px" className="text-white" style="bold">
            DC Wine © 2025
          </PoppinsText>
          <div className="flex items-center gap-2">
            <PoppinsText fontSize="16px" className="text-white" style="bold">
              Created by{' '}
            </PoppinsText>
            <a
              href="https://www.enriquesuarez.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/es.avif"
                alt="created by ES logo"
                width={24}
                height={24}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
