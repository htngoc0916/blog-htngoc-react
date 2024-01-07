import { Table } from 'flowbite-react'
import { ActionDelete, ActionEdit } from '~/components/action'
import { Category } from '~/types'
import Active from '~/components/active'
import { useState } from 'react'
import ModalDelete from '~/components/modal/ModalDelete'

export interface CategoryListProps {
  className?: string
  data?: Category[] | undefined
  onEditCategory?: (category: Category) => void
  onRemoveCategory?: (category: Category) => void
}

export default function CategoryList({ data, className, onEditCategory, onRemoveCategory }: CategoryListProps) {
  const [openModal, setOpenModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleRemoveCategoryClick = (category: Category) => {
    setSelectedCategory(category)
    setOpenModal(true)
  }

  const handleRemoveConfirm = () => {
    if (selectedCategory) {
      onRemoveCategory?.(selectedCategory)
    }
    setOpenModal(false)
  }

  return (
    <>
      <div className={className}>
        <Table striped className='flex-1'>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Category Name</Table.HeadCell>
            <Table.HeadCell>Active</Table.HeadCell>
            <Table.HeadCell className='hidden 2xl:table-cell'>Created Time</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y text-text1 dark:text-text8'>
            {data &&
              data.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.id}</Table.Cell>
                  <Table.Cell>{category.categoryName}</Table.Cell>
                  <Table.Cell>
                    <Active active={category.usedYn === 'Y' ? true : false}></Active>
                  </Table.Cell>
                  <Table.Cell className='hidden 2xl:table-cell'>{category.regDt?.toString()}</Table.Cell>
                  <Table.Cell>
                    <ActionEdit onClick={() => onEditCategory?.(category)} />
                    <ActionDelete onClick={() => handleRemoveCategoryClick(category)} />
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
