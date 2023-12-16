import axios, { AxiosInstance } from 'axios'
import { getFreshToken, removeToken, saveToken } from '~/utils/auth'
import { APP_API_URL_DEV } from './apiConstanst'
import { store } from '~/app/store'
import { refreshTokenFailed, refreshTokenSuccess } from '~/app/auth/authSlice'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO } from '~/types'
import authApi from './authApi'

//public
const axiosPublic = axios.create({
  baseURL: APP_API_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
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
const axiosPrivate = (navigate: (to: string) => void): AxiosInstance => {
  const axiosClient = axios.create({
    baseURL: APP_API_URL_DEV,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  axiosClient.interceptors.request.use(
    async (config) => {
      return config
    },
    (error) => Promise.reject(error)
  )

  axiosClient.interceptors.response.use(
    async (response) => {
      return response.data
    },
    async (error) => {
      if (error.response && error.response.status) {
        const originalRequest = error.config

        if (error.response.status === 401) {
          const refreshToken = await getFreshToken()
          if (refreshToken) {
            try {
              const response: ApiResponseDTO<AuthResponseDTO> = await authApi.authRefreshToken({
                refreshToken,
                navigate
              })
              await saveToken(response.data.accessToken, response.data.refreshToken)

              if (response && response.status.includes(API_STATUS.SUCCESS)) {
                if (originalRequest.headers) {
                  console.log('set Header')
                  originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`
                }
                store?.dispatch(refreshTokenSuccess({ ...response.data }))
                return axiosClient(originalRequest)
              }
            } catch (refreshError) {
              console.log('Error refreshing token', refreshError)
            }
          }
        }
        if (error.response.status === 404 || error.response.status === 403) {
          await store?.dispatch(refreshTokenFailed())
          await removeToken()
          navigate('/login')
        }
      }
      return Promise.reject(error)
    }
  )

  return axiosClient
}

export { axiosPublic, axiosPrivate }
