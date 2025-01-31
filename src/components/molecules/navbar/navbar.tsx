import LocaleSwitcher from '../locale_switcher/locale_switcher'

export default function NavBar() {
  return (
    <div className="flex items-center justify-between p-4">
      <LocaleSwitcher />
    </div>
  )
}
