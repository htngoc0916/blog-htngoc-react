import axiosClient from './axios'
import { Category } from '~/types'
import { API_VERSION, CATEGORY_ADD_URL } from './apiConstanst'

const categoryApi = {
  addTag(data: Category): Promise<Category> {
    const url = `${API_VERSION}${CATEGORY_ADD_URL}`
    return axiosClient.post(url, { ...data })
  }
}

export default categoryApi
