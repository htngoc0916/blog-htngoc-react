import axios from 'axios'
import { getFreshToken, getToken, saveToken } from '~/utils/auth'
import { APP_API_URL_DEV } from './apiConstanst'
import { jwtDecode } from 'jwt-decode'
import { store } from '~/app/store'
import { refreshTokenJob } from '~/app/auth/authSlice'
import { API_STATUS, ApiResponseDTO, AuthResponseDTO, RefreshTokenDTO } from '~/types'
import authApi from './authApi'

const axiosClient = axios.create({
  baseURL: APP_API_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// axiosClient.interceptors.request.use(
//   async (config) => {
//     const accessToken = await getToken()
//     const refreshToken = (await getFreshToken()) as string
//     console.log('old refresh token: ', refreshToken)
//     console.log('old access token: ', accessToken)
//     const currentDate = new Date()
//     if (accessToken) {
//       const decodedToken: { exp: number } = jwtDecode(accessToken)
//       if (decodedToken.exp * 1000 < currentDate.getTime()) {
//         try {
//           // await store.dispatch(refreshTokenJob({ refreshToken }))
//           const response: ApiResponseDTO<AuthResponseDTO> = await authApi.authRefreshToken({ refreshToken })
//           console.log(response)
//           // const newToken = await getToken()
//           // if (config?.headers) {
//           //   console.log('newToken: ', newToken)
//           //   config.headers['authorization'] = `Bearer ${newToken}`
//           // }
//         } catch (_error) {
//           console.log('re error', _error)
//           return Promise.reject(_error)
//         }
//       }
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Check if it's an error response and has a status code
    if (error.response && error.response.status) {
      const originalRequest = error.config

      // Check if the error status is 401 (Unauthorized)
      if (error.response.status === 401) {
        const refreshToken = await getFreshToken()
        console.log('old:', refreshToken)
        if (refreshToken) {
          try {
            // Dispatch the refreshTokenJob action to refresh the token
            const response: ApiResponseDTO<AuthResponseDTO> = await authApi.authRefreshToken({ refreshToken })
            await saveToken(response.data.accessToken, response.data.refreshToken)

            console.log('new refreshToken: ', getFreshToken())
            console.log('new accessToken: ', getToken())

            // If the refreshTokenJob is successful, update the Authorization header
            if (response && response?.status.includes(API_STATUS.SUCCESS)) {
              console.log('ok - access_token: ', response.data.accessToken)
              if (originalRequest.headers) {
                console.log('set Header')
                originalRequest.headers['Authorization'] = `Bearer ${response?.data?.accessToken}`
              }

              // Retry the original request with the updated token
              return axiosClient(originalRequest)
            }
          } catch (refreshError) {
            console.log('Error refreshing token', refreshError)
          }
        }
      }
    }

    // If it's not a 401 error or refreshTokenJob failed, reject the promise
    return Promise.reject(error)
  }
)

export default axiosClient
