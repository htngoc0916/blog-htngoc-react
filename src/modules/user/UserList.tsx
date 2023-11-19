import { Avatar, Badge, Table } from 'flowbite-react'
import { HiCheck } from 'react-icons/hi2'
import { ActionAdd, ActionDelete, ActionEdit } from '~/components/action'
import { BadgeGroup } from '~/components/badge'
import PaginationCustom from '~/components/pagination/PaginationCustom'

export interface UserListProps {}

export default function UserList() {
  return (
    <div className='p-4 bg-white rounded-xl dark:bg-darkbg3'>
      <div className='flex items-center justify-end mb-6'>
        <ActionAdd></ActionAdd>
      </div>

      <Table striped>
        <Table.Head>
          <Table.HeadCell>User Info</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Roles</Table.HeadCell>
          <Table.HeadCell>Created</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='flex items-center justify-start whitespace-nowrap'>
              <Avatar img='/img/avatar_people.jpg' rounded>
                <div className='space-y-1 font-medium dark:text-white'>
                  <div className='text-base text-text1 dark:text-text8'>Jese Leos</div>
                  <div className='text-sm text-text2 dark:text-gray-400'>Joined in August 2014</div>
                </div>
              </Avatar>
            </Table.Cell>
            <Table.Cell>
              <BadgeGroup>
                <Badge icon={HiCheck} className='px-2'>
                  active
                </Badge>
              </BadgeGroup>
            </Table.Cell>
            <Table.Cell>
              <span className='text-base'>Admin</span>
            </Table.Cell>
            <Table.Cell>
              <span className='text-base'>2023.12.01 10:00</span>
            </Table.Cell>
            <Table.Cell>
              <ActionEdit></ActionEdit>
              <ActionDelete></ActionDelete>
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
