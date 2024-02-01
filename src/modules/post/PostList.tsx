import { memo, useState } from 'react'
import ModalDelete from '~/components/modal/ModalDelete'
import { Post } from '~/types'
import { Table } from 'flowbite-react'
import { ActionDelete, ActionEdit } from '~/components/action'
import Active from '~/components/active'
import { HiOutlineEye } from 'react-icons/hi2'
import { numberWithCommas } from '~/utils/numberWithCommas'

export interface PostListProps {
  className?: string
  data?: Post[] | undefined
  onEditPost?: (post: Post) => void
  onRemovePost?: (post: Post) => void
}

const PostList = memo(function PostList({ data, className, onEditPost, onRemovePost }: PostListProps) {
  const [openModal, setOpenModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const handleRemovePostClick = (post: Post) => {
    setSelectedPost(post)
    setOpenModal(true)
  }

  const handleRemoveConfirm = () => {
    if (selectedPost) {
      onRemovePost?.(selectedPost)
    }
    setOpenModal(false)
  }

  return (
    <>
      <div className={className}>
        <Table striped className='flex-1'>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>View</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created Time</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y text-text1 dark:text-text8'>
            {data &&
              data.map((post) => (
                <Table.Row key={post.id}>
                  <Table.Cell>{post?.id}</Table.Cell>
                  <Table.Cell className='flex items-center justify-start max-w-xl'>
                    <img src={post?.thumbnail} alt='' className='object-cover w-24 h-16 mr-2 rounded' />
                    <h3 className='flex-1 text-base whitespace-pre-wrap text-text1 dark:text-text8'>{post?.title}</h3>
                  </Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center justify-start gap-1'>
                      <HiOutlineEye className='w-4 h-4'></HiOutlineEye>
                      {numberWithCommas(post?.viewCnt)}
                    </div>
                  </Table.Cell>
                  <Table.Cell>{post?.user?.userName}</Table.Cell>
                  <Table.Cell>
                    <Active active={post?.usedYn === 'Y' ? true : false}></Active>
                  </Table.Cell>
                  <Table.Cell>{post?.regDt?.toString()}</Table.Cell>
                  <Table.Cell className='w-32'>
                    <ActionEdit onClick={() => onEditPost?.(post)} />
                    <ActionDelete onClick={() => handleRemovePostClick(post)} />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <ModalDelete
        show={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleRemoveConfirm}
        message='Bạn có thực sự muốn xoá không?'
      ></ModalDelete>
    </>
  )
})

export default PostList
