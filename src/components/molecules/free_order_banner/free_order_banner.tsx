import { getTranslations } from 'next-intl/server'
import { PoppinsText } from '@/components/atoms/poppins_text'

export default async function FreeOrderBanner() {
  const t = await getTranslations('home_page')

  return (
    <div className="w-full overflow-hidden bg-[#ccb32b] py-2 pt-20">
      <div className="marquee text-lg font-bold text-white">
        <div className="flex gap-56">
          <PoppinsText fontSize="16px" style="bold">
            {t('free_order_message')}
          </PoppinsText>
          <PoppinsText fontSize="16px" style="bold">
            {t('free_order_message')}
          </PoppinsText>
          <PoppinsText
            fontSize="16px"
            style="bold"
            className="hidden text-black md:flex"
          >
            {t('free_order_message')}
          </PoppinsText>
          <PoppinsText
            fontSize="16px"
            style="bold"
            className="hidden text-black md:flex"
          >
            {t('free_order_message')}
          </PoppinsText>
          <PoppinsText
            fontSize="16px"
            style="bold"
            className="hidden text-black md:flex"
          >
            {t('free_order_message')}
          </PoppinsText>
        </div>
      </div>
    </div>
  )
}
