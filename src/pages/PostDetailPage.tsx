import { PostContent, PostImage, PostMeta } from '~/modules/post'
import PostRelated from '~/modules/post/PostRelated'

export interface PostDeailtPageProps {}

export default function PostDeailtPage() {
  return (
    <section className='dark:bg-darkbg2 pt-page'>
      <div className='container-page'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <PostMeta></PostMeta>
          <PostImage></PostImage>
        </div>
        <PostContent></PostContent>
        <PostRelated></PostRelated>
      </div>
    </section>
  )
}
