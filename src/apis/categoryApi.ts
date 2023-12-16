import { CategoryRequestDTO, Category } from '~/types'
import { CATEGORY_ADD_URL } from './apiConstanst'
import { getToken } from '~/utils/auth'
import { axiosPrivate } from './axios'

const categoryApi = {
  addTag(data: CategoryRequestDTO): Promise<Category> {
    const accessToken = getToken()
    return axiosPrivate(data.navigate).post(CATEGORY_ADD_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
export default categoryApi
