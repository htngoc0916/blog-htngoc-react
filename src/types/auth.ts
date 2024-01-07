import { Role } from './role'

export interface AuthResponseDTO {
  accessToken: string
  tokenType?: string
  refreshToken: string
  id: number
  userName: string
  email: string
  avatar: string
  roles: Role[]
}

export interface LoginResponseDTO {
  token: string
  tokenType: string
}

export interface LoginRequestDTO {
  email: string
  password: string
}

export interface RegisterRequestDTO {
  userName: string
  email: string
  password: string
}

export interface LogoutRequestDTO {
  navigate: (to: string) => void
}

export interface RefreshTokenDTO {
  refreshToken?: string
  navigate: (to: string) => void
}
