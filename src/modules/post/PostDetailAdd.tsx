import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { Breadcrumb } from 'flowbite-react'
import PostDetailForm from './PostDetailForm'
import { API_STATUS, ApiResponseDTO, Post } from '~/types'
import postApi from '~/apis/postApi'

function PostDetailAdd() {
  const { postId } = useParams<{ postId: string }>()
  const isEdit = postId !== '0'

  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined)

  useEffect(() => {
    if (postId && Number(postId) > 0) {
      const getPostById = async () => {
        const response: ApiResponseDTO<Post> = await postApi.getPostById(Number(postId))
        if (response?.status.includes(API_STATUS.FAILED)) {
          console.log('Failed to fetch post details', response.message)
          return null
        } else {
          setSelectedPost(response.data)
        }
      }
      getPostById()
    }
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
          <Breadcrumb.Item>{isEdit ? 'Edit post' : 'Create post'}</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <PostDetailForm data={selectedPost} isEdit={isEdit}></PostDetailForm>
    </div>
  )
}
export default PostDetailAdd
