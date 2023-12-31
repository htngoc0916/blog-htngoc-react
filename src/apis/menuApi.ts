import { ApiResponseDTO } from '~/types'
import { axiosPublic } from './axios'
import { MENU_URL, MENU_GET_BY_CODE } from './apiConstanst'
import { Menu } from '~/types/menu'
const menuApi = {
  getAllMenus(): Promise<ApiResponseDTO<Menu[]>> {
    return axiosPublic.get(MENU_URL)
  },
  getAllMenuByCode(code: string): Promise<ApiResponseDTO<Menu[]>> {
    const url = MENU_GET_BY_CODE + '/' + code
    return axiosPublic.get(url)
  }
}

export default menuApi
