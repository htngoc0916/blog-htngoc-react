import axiosClient from './axios'
import { ApiResponseDTO, AuthResponseDTO, LoginRequestDTO, User, RegisterRequestDTO, RefreshTokenDTO } from '~/types'
import { API_VERSION, AUTH_LOGIN_URL, AUTH_REFRESH_TOKEN, AUTH_REGISTER_URL } from './apiConstanst'

const authApi = {
  login(data: LoginRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    const { email, password } = data
    return axiosClient.post(AUTH_LOGIN_URL, { email, password })
  },

  authFetchMe(data: { email: string; token: string }): Promise<ApiResponseDTO<User>> {
    const { email, token } = data
    const url = `${API_VERSION}/users/email/${email}`
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  },

  authRegister(data: RegisterRequestDTO): Promise<ApiResponseDTO<User>> {
    return axiosClient.post(AUTH_REGISTER_URL, { ...data })
  },

  authRefreshToken(data: RefreshTokenDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    return axiosClient.post(AUTH_REFRESH_TOKEN, { ...data })
  }
}

export default authApi
