import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authRefreshToken } from '~/app/auth/authSlice'
import { getFreshToken, getToken } from '~/utils/auth'
import { APP_API_URL_DEV } from './apiConstanst'

const axiosClient = axios.create({
  baseURL: APP_API_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// axiosClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error)
// )

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && getFreshToken()) {
      const refreshToken = getFreshToken()

      if (refreshToken) {
        const dispatch = useDispatch()
        const refreshedToken = await dispatch(authRefreshToken({ refreshToken }))
        console.log('🚀 ~ file: axios.ts:44 ~ refreshedToken:', refreshedToken)

        if (refreshedToken) {
          originalRequest.headers.Authorization = `Bearer ${refreshedToken}`
          return axiosClient(originalRequest)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
