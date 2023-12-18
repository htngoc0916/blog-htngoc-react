import { ApiResponseDTO } from '~/types'
import { axiosPublic } from './axios'
import { MENU_GET_ALL } from './apiConstanst'
import { Menu } from '~/types/menu'
const menuApi = {
  getAllMenus(): Promise<ApiResponseDTO<Menu[]>> {
    const url = MENU_GET_ALL
    return axiosPublic.get(url)
  }
}

export default menuApi
