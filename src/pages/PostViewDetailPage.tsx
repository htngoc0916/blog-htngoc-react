import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDataPostView } from '~/app/post/postViewSlice'
import { PostViewContent, PostViewMeta, PostViewRelated } from '~/modules/post'
import { BLOG_TITLE } from '~/utils/constant'

export default function PostViewLayout() {
  const { slug } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (slug) {
      window.document.title = slug
      dispatch(fetchDataPostView(slug as string))
    }

    return () => {
      window.document.title = BLOG_TITLE
    }
  }, [slug, dispatch])

  if (!slug) return null
  return (
    <section className='dark:bg-darkbg2 pt-page'>
      <div className='container-page'>
        <PostViewMeta className='grid grid-cols-1 gap-4 lg:grid-cols-2'></PostViewMeta>
        <PostViewContent></PostViewContent>
        <PostViewRelated></PostViewRelated>
      </div>
    </section>
  )
}
