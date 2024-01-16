import { Button, ButtonProps } from 'flowbite-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { HiPlus } from 'react-icons/hi2'

const ActionAdd = memo(function ActionAdd(props: ButtonProps) {
  const { children, ...rest } = props
  const { t } = useTranslation('common')
  return (
    <Button color='primary' {...rest}>
      <HiPlus className='w-4 h-4 mr-2' />
      {t('acctions.add')}
    </Button>
  )
})

export default ActionAdd
