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
      <HomeBanner></HomeBanner>
      <HomeTopPost></HomeTopPost>
      <HomeAllPost></HomeAllPost>
    </main>
  )
}
