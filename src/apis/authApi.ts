import { LoginRequest, User } from '~/types/user'
import axiosClient from './axios'
import { ApiResponse, AuthResponse } from '~/types'
import { API_VERSION } from '~/utils/constant'

const authApi = {
  login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const { email, password } = data
    const url = '/auth/login'
    return axiosClient.post(url, { email, password })
  },

  authFetchMe(data: { email: string; token: string }): Promise<ApiResponse<User>> {
    const { email, token } = data

    const url = `${API_VERSION}/users/email/${email}`
    return axiosClient.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  }
}

export default authApi
