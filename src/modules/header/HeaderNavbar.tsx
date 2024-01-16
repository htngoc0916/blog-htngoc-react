// import { Dropdown, Navbar } from 'flowbite-react'
// import HeaderUserInfo from './HeaderUserInfo'
// import HeaderLogo from './HeaderLogo'
// import HeaderItems from './HeaderItems'
// import { DefaultProps } from '~/utils/defautProp'
// import { twMerge } from 'tailwind-merge'
// import useScrollPosition from '~/hooks/useScrollPosition'
// import { ButtonDarkMode } from '~/components/button'
// import { IconVietNam, IconUnitedStates, IconKorea } from '~/components/icons'
// import { useState } from 'react'

// const classes = {
//   root: {
//     base: 'fixed top-0 left-0 w-full z-[90]'
//   },
//   children: {
//     base: 'py-1 bg-white border-b shadow-sm border-text7 dark:border-text3 dark:bg-darkbg backdrop-filter backdrop-blur-lg bg-opacity-60 firefox:bg-opacity-90 transition-all',
//     sroll: {
//       on: 'py-0',
//       off: 'py-1'
//     }
//   }
// }

// const languages = [
//   {
//     key: 'VI',
//     value: 'Tiếng Việt',
//     icon: IconVietNam
//   },
//   {
//     key: 'KR',
//     value: '한국어',
//     icon: IconKorea
//   },
//   {
//     key: 'EN',
//     value: 'English',
//     icon: IconUnitedStates
//   }
// ]

// export function HeaderNavbar(props: DefaultProps) {
//   const { scrollY } = useScrollPosition()
//   const [currentLanguage, setCurrentLanguage] = useState()

//   const handleItemChange = (item: { key: string; value: string; icon: React.ComponentType<any> }) => {
//     setCurrentLanguage(item.key)
//     console.log('🚀 ~ handleItemChange ~ value:', item)
//   }

//   return (
//     <menu id='menu' className={twMerge(classes.root.base, props.className)}>
//       <div
//         className={twMerge(
//           classes.children.base,
//           scrollY && scrollY > 20 ? classes.children.sroll.on : classes.children.sroll.off
//         )}
//       >
//         <div className='container-page'>
//           <Navbar fluid rounded className='transition-all bg-transparent sm:px-0 dark:bg-darkbg'>
//             <HeaderLogo href='/' className='logo'></HeaderLogo>

//             <div className='flex items-center justify-center gap-3 md:order-2 avatar'>
//               <Dropdown
//                 label=''
//                 renderTrigger={() => (
//                   <div className='flex gap-2'>
//                     {/* {languages.find((item) => item.key === currentLanguage)?.icon as React.ReactNode} */}
//                     {const IconLement = currentLanguage.icon
//                     <IconLement className='w-6'></IconLement>}
//                     <span>{currentLanguage.toUpperCase()}</span>
//                   </div>
//                 )}
//               >
//                 {languages.map((item) => {
//                   const IconElement = item.icon
//                   return (
//                     <Dropdown.Item
//                       key={item.key}
//                       icon={() => <IconElement className='w-5 h-5 mr-3 rounded-full'></IconElement>}
//                       onClick={() => handleItemChange(item)}
//                     >
//                       {item.value}
//                     </Dropdown.Item>
//                   )
//                 })}
//               </Dropdown>

//               <ButtonDarkMode></ButtonDarkMode>
//               <HeaderUserInfo />
//               <Navbar.Toggle />
//             </div>

//             <Navbar.Collapse color='primary'>
//               <HeaderItems></HeaderItems>
//             </Navbar.Collapse>
//           </Navbar>
//         </div>
//       </div>
//     </menu>
//   )
// }

// export default HeaderNavbar

import { Dropdown, Navbar } from 'flowbite-react'
import HeaderUserInfo from './HeaderUserInfo'
import HeaderLogo from './HeaderLogo'
import HeaderItems from './HeaderItems'
import { DefaultProps } from '~/utils/defautProp'
import { twMerge } from 'tailwind-merge'
import useScrollPosition from '~/hooks/useScrollPosition'
import { ButtonDarkMode } from '~/components/button'
import { IconVietNam, IconUnitedStates, IconKorea } from '~/components/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const classes = {
  root: {
    base: 'fixed top-0 left-0 w-full z-[90]'
  },
  children: {
    base: 'py-1 bg-white border-b shadow-sm border-text7 dark:border-text3 dark:bg-darkbg backdrop-filter backdrop-blur-lg bg-opacity-60 firefox:bg-opacity-90 transition-all',
    sroll: {
      on: 'py-0',
      off: 'py-1'
    }
  }
}

const languages = [
  {
    key: 'vi',
    value: 'Tiếng Việt',
    icon: IconVietNam
  },
  {
    key: 'kr',
    value: '한국어',
    icon: IconKorea
  },
  {
    key: 'en',
    value: 'English',
    icon: IconUnitedStates
  }
]

interface laguage {
  key: string
  value: string
  icon: React.ComponentType<any>
}

export function HeaderNavbar(props: DefaultProps) {
  const { scrollY } = useScrollPosition()
  const [currentLanguage, setCurrentLanguage] = useState<laguage>(languages[0])
  const { i18n } = useTranslation()

  const handleChangeLanguage = (item: laguage) => {
    i18n.changeLanguage(item.key)
    setCurrentLanguage(item)
  }

  return (
    <menu id='menu' className={twMerge(classes.root.base, props.className)}>
      <div
        className={twMerge(
          classes.children.base,
          scrollY && scrollY > 20 ? classes.children.sroll.on : classes.children.sroll.off
        )}
      >
        <div className='container-page'>
          <Navbar fluid rounded className='transition-all bg-transparent sm:px-0 dark:bg-darkbg'>
            <HeaderLogo href='/' className='logo'></HeaderLogo>

            <div className='flex items-center justify-center gap-3 md:order-2 avatar'>
              <Dropdown
                label=''
                renderTrigger={() => (
                  <div className='flex items-center justify-center gap-2'>
                    {currentLanguage.icon && (
                      <currentLanguage.icon className='w-6 h-6 rounded-full'></currentLanguage.icon>
                    )}
                    <span className='w-8 text-text2 dark:text-white'>{currentLanguage.key.toUpperCase()}</span>
                  </div>
                )}
              >
                {languages.map((item) => {
                  const IconElement = item.icon
                  return (
                    <Dropdown.Item
                      key={item.key}
                      icon={() => <IconElement className='w-5 h-5 mr-3 rounded-full'></IconElement>}
                      onClick={() => handleChangeLanguage(item)}
                    >
                      {item.value}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown>

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
