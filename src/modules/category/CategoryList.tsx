import { Table } from 'flowbite-react'
import { ActionAdd } from '~/components/action'
import PaginationCustom from '~/components/pagination/PaginationCustom'

export interface CategoryProps {}

export default function CategoryList() {
  return (
    <div className='p-4 bg-white rounded-xl dark:bg-darkbg3'>
      <div className='flex items-center justify-end mb-6'>
        <ActionAdd></ActionAdd>
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>User Info</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href='#' className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'>
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <div className='mt-10'>
        <PaginationCustom></PaginationCustom>
      </div>
    </div>
  )
}
