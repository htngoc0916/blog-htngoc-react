import axiosClient from './axios'
import { Category } from '~/types'
import { CATEGORY_ADD_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'

const categoryApi = {
  addTag(data: Category): Promise<Category> {
    const accessToken = getToken()
    console.log('call:', accessToken)
    return axiosClient.post(CATEGORY_ADD_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
export default categoryApi
