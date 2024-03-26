import { DefaultProps } from '~/utils/defautProp'
import FeatureTitle from './FeatureTitle'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
export interface IHomeBannerProps extends DefaultProps {}
const classes = {
  base: 'relative pt-32 pb-8 bg-white dark:bg-darkbg1 dark:bg-darkbg2'
}
export default function HomeBanner(props: IHomeBannerProps) {
  const { t } = useTranslation('home')
  return (
    <section className={twMerge(classes.base, props.className)}>
      <div className='container-page'>
        <div className='flex flex-col items-center justify-center pb-4 md:pb-8'>
          <FeatureTitle className='text-3xl md:text-4xl'>htngoc Blog</FeatureTitle>
          <div className='mb-3 text-3xl font-bold md:text-5xl text-text2 dark:text-text7'>{t('title')} 🥳</div>
          <div className='text-center lg:text-xl'>{t('description')}</div>
        </div>
      </div>
    </section>
  )
}
