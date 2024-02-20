import { ApiResponseDTO, FileMaster, UploadFileRequest, DeleteFileByIdRequest } from '~/types'
import { getToken } from '~/utils/auth'
import { axiosPrivate } from './axios'
import { CLOUDINARY_UPLOAD } from './apiConstanst'

const fileUpload = {
  uploadImage(data: UploadFileRequest): Promise<ApiResponseDTO<FileMaster>> {
    const accessToken = getToken()
    const url = CLOUDINARY_UPLOAD + '/' + data.id + '/upload'

    const formData = new FormData()
    formData.append('file', data.file)

    return axiosPrivate.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  deleteImage(data: DeleteFileByIdRequest): Promise<ApiResponseDTO<string>> {
    const accessToken = getToken()
    const url = CLOUDINARY_UPLOAD + '/delete/' + data.id

    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },

  deleteImageByFileName(fileName: string): Promise<ApiResponseDTO<string>> {
    const accessToken = getToken()
    const url = CLOUDINARY_UPLOAD + '/delete/filename/' + fileName

    return axiosPrivate.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default fileUpload
