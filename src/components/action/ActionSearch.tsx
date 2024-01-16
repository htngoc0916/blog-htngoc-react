import { Button, ButtonProps } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function ActionSearch(props: ButtonProps) {
  const { t } = useTranslation('common')
  return (
    <Button color='primary' outline {...props}>
      <HiMagnifyingGlass className='w-4 h-4 mr-2' />
      <span>{t('acctions.search')}</span>
    </Button>
  )
}
