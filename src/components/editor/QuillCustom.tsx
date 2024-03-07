import { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
import ImageUploader from 'quill-image-uploader'
import hljs from 'highlight.js'
import { toast } from 'react-toastify'
import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types'
import fileUpload from '~/apis/fileUploadApi'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'

ReactQuill.Quill.register('modules/imageUploader', ImageUploader)

hljs.configure({
  languages: ['javascript', 'python', 'java', 'sql']
})

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
  'code-block',
  'color',
  'background',
  'align'
]

const toolbarOptions = [
  [{ header: 1 }, { header: 2 }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean']
]

const highlightCode = (text: string) => hljs.highlightAuto(text).value

export interface QuillCustomProps {
  value?: string
  placeholder?: string
  onChange?: (content: string) => void
  theme?: string
}

export default function QuillCustom(props: QuillCustomProps) {
  const { value = '', placeholder, onChange, theme } = props
  const userInfo = useAppSelector(userInfoSelector)
  const [contentValue, setContentValue] = useState<string>('')
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    setContentValue(value)
  }, [value])

  const handleChange = (content: string) => {
    setContentValue(content)
    onChange?.(content)
  }

  const handleCustomCodeBlock = () => {}

  const handleImageUpload = async (file: File) => {
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
      return ''
    }
  }

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: highlightCode
      },
      toolbar: {
        container: toolbarOptions,
        handlers: {
          'code-block': handleCustomCodeBlock
        }
      },
      clipboard: {
        matchVisual: false
      },
      imageUploader: {
        upload: handleImageUpload
      }
    }),
    []
  )

  return (
    <ReactQuill
      ref={quillRef}
      value={contentValue}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      theme={theme || 'snow'}
      placeholder={placeholder}
    />
  )
}
