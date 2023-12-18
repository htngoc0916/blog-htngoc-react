export enum ROLE {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}
export interface User {
  id: number | string
  userName: string
  email: string
  avatar: string
  roles: ROLE[]
}
