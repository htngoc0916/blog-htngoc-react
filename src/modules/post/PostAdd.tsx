import { Breadcrumb } from 'flowbite-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HiOutlineDocumentPlus } from 'react-icons/hi2'

export interface PostAddProps {}

function PostAdd(props: PostAddProps) {
  const { postId } = useParams<{ postId: string }>()

  useEffect(() => {
    console.log(postId)
  }, [postId])
  return (
    <div className='p-6'>
      <Breadcrumb aria-label='Default breadcrumb example'>
        <Breadcrumb.Item href='/auth/post' icon={HiOutlineDocumentPlus}>
          Post
        </Breadcrumb.Item>
        <Breadcrumb.Item>New post</Breadcrumb.Item>
      </Breadcrumb>
      post add page {postId}
    </div>
  )
}
export default PostAdd
