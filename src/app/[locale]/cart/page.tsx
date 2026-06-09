import CartContent from '@/components/molecules/cart_content/cart_content'
import { useTranslations } from 'next-intl'

const CartPage = () => {
  const t = useTranslations('cart_page')

  return (
    <CartContent
      translations={{
        title: t('title'),
        empty: t('empty'),
        product: t('product'),
        quantity: t('quantity'),
        price: t('price'),
        remove: t('remove'),
        subtotal: t('subtotal'),
        total: t('total'),
        shipping: t('shipping'),
        checkout: t('checkout'),
      }}
    />
  )
}

export default CartPage
