import AuthenticationLayout from '~/layout/AuthenticationLayout'
import { RegisterForm } from '~/modules/auth'

const page = {
  heading: 'Tạo mới tài khoản',
  description: 'Mời nhập thông tin của bạn'
}

export default function RegisterPage() {
  return (
    <AuthenticationLayout heading={page.heading} description={page.description}>
      <RegisterForm />
    </AuthenticationLayout>
  )
}
