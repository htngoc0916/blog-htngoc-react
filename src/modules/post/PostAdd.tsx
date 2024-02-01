import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { Breadcrumb } from 'flowbite-react'

export interface PostAddProps {}

function PostAdd(props: PostAddProps) {
  const { postId } = useParams<{ postId: string }>()
  const { pathname } = useLocation()

  useEffect(() => {
    console.log(postId)
  }, [postId])
  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <div className='mb-5 text-lg'>
        <Breadcrumb
          aria-label='Solid background breadcrumb example'
          className='inline-flex px-5 py-3 rounded-md bg-gray-200/70 dark:bg-gray-800'
        >
          <Breadcrumb.Item>
            <Link
              to='/auth/posts'
              className='flex items-center font-medium text-text1 dark:text-text8 hover:text-primary-900 dark:hover:text-primary-500'
            >
              <HiOutlinePencilSquare className='w-4 h-4 mr-1'></HiOutlinePencilSquare>
              <span>Post</span>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create post</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>asd</div>
      </div>
    </div>
  )
}
export default PostAdd
