import { Navbar } from 'flowbite-react'
import HeaderUserInfo from './HeaderUserInfo'
import HeaderLogo from './HeaderLogo'
import HeaderItems from './HeaderItems'
import { DefaultProps } from '~/utils/defautProp'
import { twMerge } from 'tailwind-merge'
import useScrollPosition from '~/hooks/useScrollPosition'
import { ButtonDarkMode } from '~/components/button'

const classes = {
  root: {
    base: 'fixed top-0 left-0 w-full z-[100]'
  },
  children: {
    base: 'py-1 bg-white border-b shadow-sm border-text7 dark:border-text3 dark:bg-darkbg backdrop-filter backdrop-blur-lg bg-opacity-60 firefox:bg-opacity-90 transition-all',
    sroll: {
      on: 'py-0',
      off: 'py-1'
    }
  }
}

export function HeaderNavbar(props: DefaultProps) {
  const { scrollY } = useScrollPosition()

  return (
    <menu id='menu' className={twMerge(classes.root.base, props.className)}>
      <div
        className={twMerge(
          classes.children.base,
          scrollY && scrollY > 20 ? classes.children.sroll.on : classes.children.sroll.off
        )}
      >
        <div className='container-page'>
          <Navbar fluid rounded className='bg-transparent sm:px-0 dark:bg-darkbg'>
            <HeaderLogo href='/' className='logo'></HeaderLogo>

            <div className='flex gap-3 md:order-2 avatar'>
              <ButtonDarkMode></ButtonDarkMode>
              <HeaderUserInfo />
              <Navbar.Toggle />
            </div>

            <Navbar.Collapse color='primary'>
              <HeaderItems></HeaderItems>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </menu>
  )
}

export default HeaderNavbar
