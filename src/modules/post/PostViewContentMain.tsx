import hljs from 'highlight.js'
import { useEffect } from 'react'
import { useAppSelector } from '~/app/hooks'
import { postViewDetailSelector } from '~/app/post/postViewSlice'
import { HtmlContent } from '~/components/common'

export interface IPostContentMainProps {}

export default function PostViewContentMain() {
  const postViewDetail = useAppSelector(postViewDetailSelector)
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return (
    <div className='entry-content'>
      <HtmlContent content={postViewDetail?.content}></HtmlContent>
    </div>
  )
}
