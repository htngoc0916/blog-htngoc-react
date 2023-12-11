export enum ROLE {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_USER = 'ROLE_USER'
}
export interface User {
  id: number | string
  userName: string
  email: string
  role: ROLE
}
export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}
