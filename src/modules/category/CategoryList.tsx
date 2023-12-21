import { Table } from 'flowbite-react'

export interface CategoryListProps {}

export default function CategoryList() {
  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Category Name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Active</Table.HeadCell>
        <Table.HeadCell>Created Time</Table.HeadCell>
        <Table.HeadCell>Created User</Table.HeadCell>
        <Table.HeadCell>
          <span className='sr-only'>Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className='divide-y'>
        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Table.Cell>1</Table.Cell>
          <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
            {'Apple MacBook Pro 17"'}
          </Table.Cell>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>$2999</Table.Cell>
          <Table.Cell>
            <a href='#' className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
              Edit
            </a>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
