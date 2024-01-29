import { memo, useState } from 'react'
import ModalDelete from '~/components/modal/ModalDelete'
import { Post } from '~/types'
import { Table } from 'flowbite-react'
import { ActionDelete, ActionEdit } from '~/components/action'
import Active from '~/components/active'

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
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Roles</Table.HeadCell>
            <Table.HeadCell className='hidden 2xl:table-cell'>Created Time</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y text-text1 dark:text-text8'>
            {data &&
              data.map((post) => (
                <Table.Row key={post.id}>
                  <Table.Cell className='flex items-center justify-start whitespace-nowrap'>
                    <img src={post?.thumbnail} alt='post image' />
                    <div className='text-base text-text1 dark:text-text8'>{post?.title}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <Active active={post?.usedYn === 'Y' ? true : false}></Active>
                  </Table.Cell>
                  <Table.Cell>{}</Table.Cell>
                  <Table.Cell className='hidden 2xl:table-cell'>{post.regDt?.toString()}</Table.Cell>
                  <Table.Cell>
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
