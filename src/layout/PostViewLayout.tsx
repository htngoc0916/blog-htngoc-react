import { PostViewContent, PostViewMeta, PostViewRelated } from '~/modules/post'

export default function PostViewLayout() {
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
