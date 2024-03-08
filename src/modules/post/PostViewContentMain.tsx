import { useEffect } from 'react'
import { useAppSelector } from '~/app/hooks'
import { postViewDetailSelector } from '~/app/post/postViewSlice'
import { HtmlContent } from '~/components/common'

import 'prismjs/themes/prism-okaidia.css'
import prism from 'prismjs'

export default function PostViewContentMain() {
  const postViewDetail = useAppSelector(postViewDetailSelector)
  useEffect(() => {
    if (postViewDetail) {
      prism.highlightAll()
    }
  }, [postViewDetail])

  return (
    <div className='content-editor'>
      <HtmlContent content={postViewDetail?.content}></HtmlContent>
    </div>
  )
}
