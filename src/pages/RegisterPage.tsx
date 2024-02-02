import AuthenticationLayout from '~/layout/AuthenticationLayout'
import { RegisterForm } from '~/modules/auth'
import { useTranslation } from 'react-i18next'

export default function RegisterPage() {
  const { t } = useTranslation('auth')

  return (
    <AuthenticationLayout heading={t('heading')} description={t('description-register')}>
      <RegisterForm />
    </AuthenticationLayout>
  )
}
