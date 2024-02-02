// authApi.ts
import { ApiResponseDTO, AuthResponseDTO, LoginRequestDTO, User, RegisterRequestDTO, RefreshTokenDTO } from '~/types'
import { AUTH_LOGIN_URL, AUTH_REFRESH_TOKEN, AUTH_REGISTER_URL } from './apiConstanst'
import { axiosPrivate, axiosPublic } from './axios'
import i18n from '~/i18n/i18n'

const authApi = {
  authLogin(data: LoginRequestDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    return axiosPublic.post(AUTH_LOGIN_URL, data, {
      headers: {
        'Accept-Language': i18n.language
      }
    })
  },

  authRegister(data: RegisterRequestDTO): Promise<ApiResponseDTO<User>> {
    return axiosPublic.post(AUTH_REGISTER_URL, data, {
      headers: {
        'Accept-Language': i18n.language
      }
    })
  },

  authRefreshToken(data: RefreshTokenDTO): Promise<ApiResponseDTO<AuthResponseDTO>> {
    return axiosPrivate.post(AUTH_REFRESH_TOKEN, data, {
      headers: {
        'Accept-Language': i18n.language
      }
    })
  }
}

export default authApi
