// import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
// import { APP_API_URL_DEV } from '~/utils/constant'

// const axiosClient = axios.create({
//   baseURL: APP_API_URL_DEV,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Add a response interceptor
// axiosClient.interceptors.response.use(
//   function (response: AxiosResponse) {
//     return response.data
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

// export default axiosClient

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { refreshToken } from '~/app/auth/authSlice'
import { RefreshTokenDTO } from '~/types'
import { getFreshToken, getToken } from '~/utils/auth'
import { APP_API_URL_DEV } from '~/utils/constant'

const axiosClient = axios.create({
  baseURL: APP_API_URL_DEV,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Add a request interceptor to add the JWT token to the authorization header
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

// Add a response interceptor to refresh the JWT token if it's expired
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    // If the error is a 401 and we have a refresh token, refresh the JWT token
    if (error.response.status === 401 && getFreshToken()) {
      const refresh_token = getFreshToken()
      const dispatch = useDispatch()
      dispatch(refreshToken(refresh_token))

      // post('/refreshToken', data)
      //   .then((response) => {
      //     sessionStorage.setItem('jwtToken', response.token)
      //     sessionStorage.setItem('refreshToken', response.refresh_token)

      //     // Re-run the original request that was intercepted
      //     originalRequest.headers.Authorization = `Bearer ${response.token}`
      //     api(originalRequest)
      //       .then((response) => {
      //         return response.data
      //       })
      //       .catch((error) => {
      //         console.log(error)
      //       })
      //     // return api(originalRequest)
      //   })
      //   .catch((err) => {
      //     // If there is an error refreshing the token, log out the user
      //     console.log(err)
      //   })
    }

    // Return the original error if we can't handle it
    return Promise.reject(error)
  }
)
