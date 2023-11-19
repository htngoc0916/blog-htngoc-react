import AuthenticationLayout from '~/layout/AuthenticationLayout'
import { SignUpForm } from '~/modules/auth'

const page = {
  heading: 'Tạo mới tài khoản',
  description: 'Mời nhập thông tin của bạn'
}

export default function SignUpPage() {
  return (
    <AuthenticationLayout heading={page.heading} description={page.description}>
      <SignUpForm />
    </AuthenticationLayout>
  )
}
