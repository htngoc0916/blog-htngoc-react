import { Pagination } from 'flowbite-react'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/app/hooks'
import { getPost, postFilterSelector, postListSelector, postPaginationSelector } from '~/app/post/postSlice'
import { ActionAdd } from '~/components/action'
import DashboardTitle from '~/components/common/DashboardTitle'
import { PostFilter, PostList } from '~/modules/post'
import { FilterPramsDTO, Post } from '~/types'

export default function PostsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const filter = useAppSelector(postFilterSelector)
  const postList = useAppSelector(postListSelector)
  const pagination = useAppSelector(postPaginationSelector)

  const { pathname } = useLocation()

  const handleSearchPost = useCallback(
    (filter: FilterPramsDTO) => {
      dispatch(getPost(filter))
    },
    [dispatch]
  )

  const onPageChange = (page: number) => {
    dispatch(
      getPost({
        ...filter,
        pageNo: page
      })
    )
  }

  const handleAddPost = useCallback(() => {
    navigate(`${pathname}/0`)
  }, [])

  const handleEditPost = useCallback((post: Post) => {
    navigate(`${pathname}/${post.id}`)
  }, [])

  const handleRemovePost = useCallback(async (post: Post) => {
    console.log('🚀 ~ PostsPage ~ post:', post)
  }, [])

  useEffect(() => {
    dispatch(getPost(filter))
  }, [])

  return (
    <div className='flex flex-col h-full p-6 mx-auto'>
      <DashboardTitle title='Posts'>Quản lý thông tin bài viết 🐞</DashboardTitle>
      <div className='grid flex-1 grid-flow-row grid-cols-1 gap-4 xl:grid-flow-col'>
        <div className='flex flex-col order-2 px-4 py-6 bg-white rounded-xl dark:bg-darkbg3 xl:order-1'>
          <div id='categories-list' className='flex flex-wrap items-center justify-start gap-3 mb-6'>
            <PostFilter filter={filter} onSeach={handleSearchPost}></PostFilter>
            <ActionAdd onClick={handleAddPost}></ActionAdd>
          </div>
          <div className='flex-1 overflow-x-auto'>
            <PostList data={postList} onEditPost={handleEditPost} onRemovePost={handleRemovePost}></PostList>
          </div>
          <div className='flex items-center justify-center mt-10'>
            <Pagination
              layout='pagination'
              currentPage={pagination.pageNo}
              totalPages={pagination.totalPage}
              onPageChange={onPageChange}
              previousLabel='Prev'
              nextLabel='Next'
              showIcons
            />
          </div>
        </div>
      </div>
    </div>
  )
}
