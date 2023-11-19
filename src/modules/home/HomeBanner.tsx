import { DefaultProps } from '~/utils/defautProp'
import FeatureTitle from './FeatureTitle'
import { twMerge } from 'tailwind-merge'
export interface IHomeBannerProps extends DefaultProps {}
const classes = {
  base: 'relative'
}
export default function HomeBanner(props: IHomeBannerProps) {
  return (
    <section className={twMerge(classes.base, props.className)}>
      <div className='container-page'>
        <div className='flex flex-col items-center justify-center py-14'>
          <FeatureTitle className='text-3xl md:text-4xl'>htngoc Blog</FeatureTitle>
          <div className='mb-3 text-3xl font-bold md:text-5xl text-text2 dark:text-text7'>Chào mừng bro 🥳</div>
          <div className='text-lg text-center'>Nơi chia sẽ những kiến thức thú vị. Cảm ơn bro đã ghé thăm.</div>
        </div>
      </div>
    </section>
  )
}
