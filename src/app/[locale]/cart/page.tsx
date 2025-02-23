import CartContent from '@/components/molecules/cart_content/car_content'
import { useTranslations } from 'next-intl'

const CartPage = () => {
  const t = useTranslations('navbar')

  return (
    <CartContent
      translations={{
        title: t('cart.title'),
        empty: t('cart.empty'),
        remove: t('cart.remove'),
        quantity: t('cart.quantity'),
        subtotal: t('cart.subtotal'),
        clear_cart: t('cart.clear_cart'),
      }}
    />
  )
}

export default CartPage
