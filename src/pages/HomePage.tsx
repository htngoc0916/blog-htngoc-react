import { HomeAllPost, HomeBanner, HomeTopPost } from '~/modules/home'

export default function HomePage() {
  return (
    <main>
      <HomeBanner className='dark:bg-darkbg1 pt-page dark:bg-darkbg2 bg-text8'></HomeBanner>
      <HomeTopPost className='pt-10 pb-16 dark:bg-darkbg3 bg-text8'></HomeTopPost>
      {/* <HomeNewPost className='dark:bg-darkbg3'></HomeNewPost> */}
      <HomeAllPost className='dark:bg-darkbg2'></HomeAllPost>
    </main>
  )
}
