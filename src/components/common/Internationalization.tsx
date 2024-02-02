import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { IconVietNam, IconUnitedStates, IconKorea } from '~/components/icons'

export interface InternationalizationProps {
  className?: string
}

const languages = [
  {
    key: 'vi',
    value: 'Tiếng Việt',
    icon: IconVietNam
  },
  {
    key: 'ko',
    value: '한국어',
    icon: IconKorea
  },
  {
    key: 'en',
    value: 'English',
    icon: IconUnitedStates
  }
]

interface Laguage {
  key: string
  value: string
  icon: React.ComponentType<any>
}

export default function Internationalization({ className }: InternationalizationProps) {
  const { i18n } = useTranslation()
  const defaultLanguage = languages.find((language) => language.key === i18n.language) as Laguage
  const [currentLanguage, setCurrentLanguage] = useState<Laguage>(defaultLanguage)

  const handleChangeLanguage = (item: Laguage) => {
    i18n.changeLanguage(item.key)
    setCurrentLanguage(item)
  }

  return (
    <Dropdown
      label=''
      renderTrigger={() => (
        <div className={twMerge('flex items-center justify-center gap-2', className)}>
          {currentLanguage.icon && <currentLanguage.icon className='w-6 h-6 rounded-full'></currentLanguage.icon>}
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
  )
}
