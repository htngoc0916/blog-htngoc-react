// authApi.ts
import { ApiResponseDTO, AuthResponseDTO, LoginRequestDTO, User, RegisterRequestDTO, RefreshTokenDTO } from '~/types'
import { AUTH_LOGIN_URL, AUTH_REFRESH_TOKEN, AUTH_REGISTER_URL } from './apiConstanst'
import { axiosPrivate, axiosPublic } from './axios'

const authApi = {
  authLogin(data: LoginRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    const { email, password } = data
    return axiosPublic.post(AUTH_LOGIN_URL, { email, password })
  },

  authRegister(data: RegisterRequestDTO): Promise<ApiResponseDTO<User>> {
    return axiosPublic.post(AUTH_REGISTER_URL, { ...data })
  },

  authRefreshToken(data: RefreshTokenDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    console.log('🚀 ~ authRefreshToken ~ data:', data.refreshToken)
    return axiosPrivate(data.navigate).post(AUTH_REFRESH_TOKEN, { ...data })
  }
}

export default authApi
