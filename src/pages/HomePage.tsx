import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchDataHome, homeFilterSelector } from '~/app/home/homeSlice'
import { useAppSelector } from '~/app/hooks'
import { HomeAllPost, HomeBanner, HomeTopPost } from '~/modules/home'

export default function HomePage() {
  const filter = useAppSelector(homeFilterSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDataHome(filter))
  }, [dispatch, filter])

  return (
    <main>
      <HomeBanner className='dark:bg-darkbg1 pt-page dark:bg-darkbg2 bg-text8'></HomeBanner>
      <HomeTopPost className='pt-10 pb-16 dark:bg-darkbg3 bg-text8'></HomeTopPost>
      <HomeAllPost className='dark:bg-darkbg2'></HomeAllPost>
    </main>
  )
}
