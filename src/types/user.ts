import { BaseDTO, FilterPramsDTO } from '.'
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
  // imageId?: number
}

export interface FetchUserDTO {
  navigate: (to: string) => void
  filter: FilterPramsDTO
}

export interface UserRequestDTO extends User {
  navigate: (to: string) => void
}

export interface UploadAvatarDTO {
  email: string
  file: File
  navigate: (to: string) => void
}

export interface DeleteAvatarDTO {
  userId: number
  navigate: (to: string) => void
}
