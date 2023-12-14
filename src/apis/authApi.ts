import axiosClient from './axios'
import { ApiResponseDTO, AuthResponseDTO, LoginRequest, User, RegisterRequest } from '~/types'
import { API_VERSION } from '~/utils/constant'

const authApi = {
  login(data: LoginRequest): Promise<ApiResponseDTO<AuthResponseDTO>> {
    const { email, password } = data
    const url = '/auth/login'
    return axiosClient.post(url, { email, password })
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

  authRegister(data: RegisterRequest): Promise<ApiResponseDTO<User>> {
    const url = '/auth/register'
    return axiosClient.post(url, { ...data })
  }
}

export default authApi
