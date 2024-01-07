import { ROLE, User } from '~/types'

function checkAdminRole(user: User | undefined): boolean {
  return !!user?.roles?.some((role) => role.roleName === ROLE.ROLE_ADMIN.toString())
}

export { checkAdminRole }
