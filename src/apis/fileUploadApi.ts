import { ApiResponseDTO, FileMaster, UploadRequest } from '~/types'
import { getToken } from '~/utils/auth'
import { axiosPrivate } from './axios'
import { CLOUDINARY_UPLOAD } from './apiConstanst'

const fileUpload = {
  uploadAvatar(data: UploadRequest): Promise<ApiResponseDTO<FileMaster>> {
    const accessToken = getToken()
    const url = CLOUDINARY_UPLOAD + '/' + data.id + '/upload'

    const formData = new FormData()
    formData.append('file', data.file)

    return axiosPrivate(data.navigate).post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default fileUpload