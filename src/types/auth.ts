import { ROLE } from '.'

export interface AuthResponseDTO {
  accessToken: string
  tokenType?: string
  refreshToken: string
  id: number
  userName: string
  email: string
  avatar: string
  roles: Set<ROLE>
}
export interface LoginResponse {
  token: string
  tokenType: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  userName: string
  email: string
  password: string
}
export interface RefreshTokenDTO {
  refreshToken: string
}
