import AuthenticationLayout from '~/layout/AuthenticationLayout'
import { LoginForm } from '~/modules/auth'

const page = {
  heading: 'Wellcome bro!',
  description: 'Mời nhập thông tin của bạn'
}

export default function LoginPage() {
  return (
    <AuthenticationLayout heading={page.heading} description={page.description}>
      <LoginForm />
    </AuthenticationLayout>
  )
}
