import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { getPost, postFilterSelector } from '~/app/post/postSlice'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { PostFilter, PostList } from '~/modules/post'
import { FilterPramsDTO, Post } from '~/types'

export default function PostsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filter = useAppSelector(postFilterSelector)

  const handleSearchPost = useCallback(
    (filter: FilterPramsDTO) => {
      dispatch(getPost({ filter, navigate }))
    },
    [dispatch, navigate]
  )

  const handleAddPost = useCallback(() => {
    console.log('🚀 ~ handleAddPost ~ handleAddPost:', handleAddPost)
  }, [])

  const handleEditPost = useCallback((post: Post) => {}, [])

  const handleRemovePost = useCallback(async (post: Post) => {}, [])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Users'>Quản lý thông tin bài viết 🐞</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>
          <div id='categories-list' className='flex flex-wrap items-center justify-start gap-3 mb-6'>
            <PostFilter filter={filter} onSeach={handleSearchPost}></PostFilter>
            <ActionAdd onClick={handleAddPost}></ActionAdd>
          </div>
          <div className='flex-1 overflow-x-auto'>
            <PostList data={undefined} onEditPost={handleEditPost} onRemovePost={handleRemovePost}></PostList>
          </div>
        </div>
      </div>
    </div>
  )
}
