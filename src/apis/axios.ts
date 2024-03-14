import axios from 'axios'
import { getFreshToken, removeToken, saveToken } from '~/utils/auth'
import { APP_API_URL_PROD } from './apiConstanst'
import { store } from '~/app/store'
import { refreshTokenFailed, refreshTokenSuccess } from '~/app/auth/authSlice'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO } from '~/types'
import authApi from './authApi'
import globalRouter from '~/utils/globalRouter'

//public
const axiosPublic = axios.create({
  // baseURL: APP_API_URL_DEV,
  baseURL: APP_API_URL_PROD,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosPublic.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axiosPublic.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    return Promise.reject(error)
  }
)

//private
const axiosPrivate = axios.create({
  // baseURL: APP_API_URL_DEV,
  baseURL: APP_API_URL_PROD,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosPrivate.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axiosPrivate.interceptors.response.use(
  async (response) => {
    return response.data
  },
  async (error) => {
    if (error.response && error.response.status) {
      const originalRequest = error.config
      if (error.response) {
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          const refreshToken = await getFreshToken()
          if (refreshToken) {
            try {
              const response: ApiResponseDTO<AuthResponseDTO> = await authApi.authRefreshToken({
                refreshToken
              })
              await saveToken(response.data.accessToken, response.data.refreshToken)

              if (response && response.status.includes(API_STATUS.SUCCESS)) {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
                }
                store?.dispatch(refreshTokenSuccess({ ...response.data }))
                return axiosPrivate(originalRequest)
              }
            } catch (_error: any) {
              if (_error.response && _error.response.data) {
                return Promise.reject(_error.response.data)
              }
              console.log('Error refreshing token')
              return Promise.reject(_error)
            }
          }
        }
        if (error.response.status === 404 || error.response.status === 403) {
          await store?.dispatch(refreshTokenFailed())
          await removeToken()
          if (globalRouter.navigate) {
            await globalRouter?.navigate('/login')
          }

          return Promise.reject(error.response.data)
        }
      }
    }
    return Promise.reject(error)
  }
)

export { axiosPublic, axiosPrivate }
