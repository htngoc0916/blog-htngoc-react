import { ROLE } from '~/types'

export default function checkAdmin(roles: ROLE[] | undefined) {
  return (roles && roles.includes(ROLE.ROLE_ADMIN)) || false
}
