import { Badge, Table } from 'flowbite-react'
import { useState } from 'react'
import { ActionDelete, ActionEdit } from '~/components/action'
import Active from '~/components/active'
import { BadgeGroup } from '~/components/badge'
import ModalDelete from '~/components/modal/ModalDelete'
import { Tag } from '~/types'

export interface TagListProps {
  className?: string
  data?: Tag[] | undefined
  onEditTag?: (tag: Tag) => void
  onRemoveTag?: (tag: Tag) => void
}

export default function TagList({ data, className, onEditTag, onRemoveTag }: TagListProps) {
  const [openModal, setOpenModal] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const handleRemoveTagClick = (tag: Tag) => {
    setSelectedTag(tag)
    setOpenModal(true)
  }

  const handleRemoveConfirm = () => {
    if (selectedTag) {
      onRemoveTag?.(selectedTag)
    }
    setOpenModal(false)
  }

  return (
    <>
      <div className={className}>
        <Table striped className='flex-1'>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Tag Name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Active</Table.HeadCell>
            <Table.HeadCell className='hidden 2xl:table-cell'>Created Time</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y text-text1 dark:text-text8'>
            {data &&
              data.map((tag) => (
                <Table.Row key={tag.id}>
                  <Table.Cell>{tag.id}</Table.Cell>
                  <Table.Cell>{tag.tagName}</Table.Cell>
                  <Table.Cell>
                    <BadgeGroup>
                      <Badge color={tag.color || 'info'}>{tag.color || 'info'}</Badge>
                    </BadgeGroup>
                  </Table.Cell>
                  <Table.Cell>
                    <Active active={tag.usedYn === 'Y' ? true : false}></Active>
                  </Table.Cell>
                  <Table.Cell className='hidden 2xl:table-cell'>{tag.regDt?.toString()}</Table.Cell>
                  <Table.Cell>
                    <ActionEdit onClick={() => onEditTag?.(tag)} />
                    <ActionDelete onClick={() => handleRemoveTagClick(tag)} />
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
}
