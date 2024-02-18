import { BaseDTO } from '.'
import { Role } from './role'

export enum ROLE {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}

export interface User extends BaseDTO {
  id?: number | undefined
  userName?: string
  email?: string
  avatar?: string
  usedYn?: string
  roles?: Role[]
}

export interface UploadAvatarDTO {
  email: string
  file: File
}

export interface DeleteAvatarDTO {
  userId: number
}
