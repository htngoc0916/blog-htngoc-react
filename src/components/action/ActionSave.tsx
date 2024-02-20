import { Button, ButtonProps } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import { HiOutlinePaperAirplane } from 'react-icons/hi2'

export interface ActionSaveProps extends ButtonProps {
  className?: string
}

export default function ActionSave(props: ActionSaveProps) {
  const { className, ...rest } = props
  const { t } = useTranslation('common')
  return (
    <Button type='submit' color='primary' className={className} {...rest}>
      {t('acctions.save')}
      <HiOutlinePaperAirplane className='w-5 h-5 ml-2 text-white' />
    </Button>
  )
}
