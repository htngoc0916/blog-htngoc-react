import axios, { AxiosResponse } from 'axios'
import { APP_API_URL_DEV } from '~/utils/constant'

const axiosClient = axios.create({
  baseURL: APP_API_URL_DEV,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
