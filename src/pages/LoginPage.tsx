import AuthenticationLayout from '~/layout/AuthenticationLayout'
import { LoginForm } from '~/modules/auth'
import { useTranslation } from 'react-i18next'

export default function LoginPage() {
  const { t } = useTranslation('auth')
  return (
    <AuthenticationLayout heading={t('heading')} description={t('description')}>
      <LoginForm />
    </AuthenticationLayout>
  )
}
