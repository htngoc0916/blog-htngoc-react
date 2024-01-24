import { Button, ButtonProps } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

export interface ActionSaveProps extends ButtonProps {
  className?: string
}

export default function ActionSave(props: ActionSaveProps) {
  const { className, ...rest } = props
  const { t } = useTranslation('common')
  return (
    <Button type='submit' color='primary' className={className} {...rest}>
      {t('acctions.save')}
    </Button>
  )
}
