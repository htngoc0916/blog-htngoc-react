import { GoogleOAuthProvider } from '@react-oauth/google'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { GOOGLE_CLIENT_ID } from '~/utils/constant'
import { DefaultProps } from '~/utils/defautProp'

const classess = {
  base: 'flex items-center justify-center w-full md:max-w-screen-sm mx-auto flex-col h-full md:px-10 px-4',
  child:
    'flex flex-col items-center justify-center w-full md:px-6 px-4 md:pt-8 pt-4 md:pb-14 pb-8 bg-white border shadow-sm rounded-3xl border-text7 dark:bg-darkbg2 dark:border-text3',
  heading: 'md:text-3xl text-xl text-text1 font-bold dark:text-text8 md:mb-3 mb-1 dark:text-white'
}
export interface IAuthenticationLayoutProps extends DefaultProps {
  heading: string
  description: string
}

export default function AuthenticationLayout(props: IAuthenticationLayoutProps) {
  const { className, heading, description, children } = props
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <section className='h-screen dark:bg-darkbg bg-primary-50'>
        <div className={twMerge(classess.base, className)}>
          <div className={classess.child}>
            <Link to='/' className='px-1 mb-4 rounded-lg w-14 md:mb-7'>
              <img src='/img/logo_htn.png' className='object-cover w-full rounded-lg' alt='logo' />
            </Link>

            <div className={twMerge(classess.heading)}>{heading}</div>
            <div className='mb-8 md:text-lg dark:text-white text-text2'>{description}</div>
            <>{children}</>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  )
}
