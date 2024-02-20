// useUploadQuill.ts
import { useMemo } from 'react'
import hljs from 'highlight.js'
import ImageUploader from 'quill-image-uploader'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
import { Quill } from 'react-quill'
import { toast } from 'react-toastify'
import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types'
import fileUpload from '~/apis/fileUploadApi'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'

hljs.configure({
  languages: ['javascript', 'java', 'python', 'node']
})

Quill.register('modules/imageUploader', ImageUploader)

export const useQuillUploadImage = () => {
  const userInfo = useAppSelector(userInfoSelector)

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value
      },
      toolbar: [
        [{ header: 1 }, { header: 2 }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
      ],
      clipboard: {
        matchVisual: false
      },
      imageUploader: {
        upload: async (file: File) => {
          const postUploadRequest: UploadFileRequest = {
            id: userInfo?.id || 0,
            file
          }

          try {
            const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadImage(postUploadRequest)

            if (response?.status.includes(API_STATUS.SUCCESS)) {
              return response.data.fileUrl
            } else {
              toast.error(response.message)
              return ''
            }
          } catch (error) {
            toast.error('Upload error')
            console.error(error)
          }
        }
      }
    }),
    [userInfo?.id]
  )

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block'
  ]

  return { modules, formats }
}
