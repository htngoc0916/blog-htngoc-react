import { useAppSelector } from '~/app/hooks'
import { postViewDetailSelector } from '~/app/post/postViewSlice'
import { HtmlContent } from '~/components/common'

export interface IPostContentMainProps {}

export default function PostViewContentMain() {
  const postViewDetail = useAppSelector(postViewDetailSelector)

  return (
    <div className='entry-content'>
      <HtmlContent content={postViewDetail?.content}></HtmlContent>
    </div>
  )
}
