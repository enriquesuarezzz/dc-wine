import { PoppinsText } from '@/components/atoms/poppins_text'
import { Link } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import Instagram from '@/components/atoms/svg/instagram'
import Facebook from '@/components/atoms/svg/facebook'
import Phone from '@/components/atoms/svg/phone'
import Whatsapp from '@/components/atoms/svg/whatsapp'

export default async function Footer() {
  const t = await getTranslations('footer')
  return (
    <footer className="bg-gold bottom-0 mt-20 w-full items-center">
      <div className="mx-auto max-w-screen-xl items-center p-4 md:py-8">
        {/* Navigation Links */}
        <div className="flex items-center justify-between">
          <div className="mb-2 mt-2 flex w-full items-center justify-center gap-10 font-medium sm:mb-0 md:mt-0">
            {/* Home Link */}
            <Link href="/">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('home')}{' '}
              </PoppinsText>
            </Link>
            {/* About us Link */}
            <Link href="/about_us">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('about_us')}
              </PoppinsText>
            </Link>
            {/* Products Link */}
            <Link href="/">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('products')}
              </PoppinsText>
            </Link>
            {/* Cookies Link */}
            <Link href="/">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('cookies')}
              </PoppinsText>
            </Link>
            {/* Privacy Policy Link */}
            <Link href="/">
              <PoppinsText
                fontSize="16px"
                style="bold"
                className="relative block w-fit text-white after:absolute after:block after:h-[3px] after:w-full after:origin-center after:scale-x-0 after:bg-[#ccb32b] after:transition after:duration-300 after:content-[''] hover:text-white after:hover:scale-x-100"
              >
                {t('privacy')}
              </PoppinsText>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-white sm:mx-auto lg:my-8" />

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-2 pt-0">
          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/dcwinecanarias?eid=ARCiLm_76uwbT789OTJKO48fu5eH51VEiYHJn_R2Ifi2RZ09y8UqBEQR1OpbQAvxHcQmjeQMsO7yOkVS#"
            className="my-auto flex h-6 items-start md:h-5 md:items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Facebook Icon */}
            <Facebook
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
          </a>
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
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/dcwinelanzarote/"
            target="_blank"
            rel="noopener noreferrer"
            className="my-auto flex h-6 items-start md:h-5 md:items-center"
          >
            {/* Instagram Icon */}
            <Instagram
              color="white"
              className="my-auto h-5 w-5 transition-all duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </div>
        {/* Divider */}
        <hr className="mt-8 w-24 border-white sm:mx-auto" />
        <div className="flex items-center justify-center gap-2 pt-4">
          <PoppinsText fontSize="16px" className="text-white" style="bold">
            DC Wine © 2025
          </PoppinsText>
        </div>
      </div>
    </footer>
  )
}
