import { Avatar, Badge, Table } from 'flowbite-react'
import { memo, useState } from 'react'
import { ActionDelete, ActionEdit } from '~/components/action'
import Active from '~/components/active'
import ModalDelete from '~/components/modal/ModalDelete'
import { ROLE, User } from '~/types'

export interface UserListProps {
  className?: string
  data?: User[] | undefined
  onEditUser?: (user: User) => void
  onRemoveUser?: (user: User) => void
}

const UserList = memo(function UserList({ data, className, onEditUser, onRemoveUser }: UserListProps) {
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleRemoveUserClick = (user: User) => {
    setSelectedUser(user)
    setOpenModal(true)
  }

  const handleRemoveConfirm = () => {
    if (selectedUser) {
      onRemoveUser?.(selectedUser)
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
              data.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell className='flex items-center justify-start whitespace-nowrap'>
                    <Avatar img={user?.avatar} rounded>
                      <div className='space-y-1 font-medium dark:text-white'>
                        <div className='text-base text-text1 dark:text-text8'>{user?.userName}</div>
                        <div className='text-sm text-text2 dark:text-text7'>{user?.email}</div>
                      </div>
                    </Avatar>
                  </Table.Cell>
                  <Table.Cell>
                    <Active active={user.usedYn === 'Y' ? true : false}></Active>
                  </Table.Cell>

                  <Table.Cell>
                    {user?.roles &&
                      user?.roles.map((role) => (
                        <span key={role.id}>{role?.roleName == ROLE.ROLE_ADMIN ? 'Admin' : 'User'}</span>
                      ))}
                  </Table.Cell>
                  <Table.Cell className='hidden 2xl:table-cell'>{user.regDt?.toString()}</Table.Cell>
                  <Table.Cell>
                    <ActionEdit onClick={() => onEditUser?.(user)} />
                    <ActionDelete onClick={() => handleRemoveUserClick(user)} />
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

export default UserList
