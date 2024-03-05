import { useEffect, useMemo, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import hljs from 'highlight.js'
import ImageUploader from 'quill-image-uploader'
import { toast } from 'react-toastify'
import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types'
import fileUpload from '~/apis/fileUploadApi'
import { useAppSelector } from '~/app/hooks'
import { userInfoSelector } from '~/app/auth/authSlice'
Quill.register('modules/imageUploader', ImageUploader)

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
  'code-block'
]

const toolbarOptions = [
  //   ['bold', 'italic', 'underline', 'strike'],
  //   ['blockquote', 'code-block'],
  //   ['link', 'image', 'video', 'formula'],

  //   [{ header: 1 }, { header: 2 }],
  //   [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  //   [{ script: 'sub' }, { script: 'super' }],
  //   [{ indent: '-1' }, { indent: '+1' }],
  //   [{ direction: 'rtl' }],

  //   [{ size: ['small', false, 'large', 'huge'] }],
  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

  //   [{ color: [] }, { background: [] }],
  //   [{ font: [] }],
  //   [{ align: [] }],

  [{ container: ['code-custom'] }],

  ['clean']
]

// const BlockEmbed = Quill.import('blots/block/embed')

// class CustomCode extends BlockEmbed {
//   static create(value: { lang: string; content: string }) {
//     const { lang, content } = value
//     const node = super.create(value)
//     const code = document.createElement('code')
//     code.className = lang
//     code.textContent = content
//     node.appendChild(code)
//     return node
//   }

//   static value(node: any) {
//     console.log('Requesting a value: ', node.textContent)
//     return {
//       lang: node.firstChild.className,
//       content: node.firstChild.innerText
//     }
//   }
// }

// CustomCode.blotName = 'code-'
// CustomCode.tagName = 'pre'
// CustomCode.className = 'ql-syntax'
// Quill.register('modules/CustomCode', CustomCode)

const BlockEmbed = Quill.import('blots/block/embed')

const highlightCode = (text: string) => hljs.highlightAuto(text).value

class CustomCode extends BlockEmbed {
  static create(value: { lang: string; content: string }) {
    const node = super.create(value)
    const code = document.createElement('code')
    code.innerHTML = highlightCode(value.content)
    node.appendChild(code)
    return node
  }

  static value(node: any) {
    console.log('Requesting a value: ', node.textContent)
    return node.textContent
  }
}

CustomCode.blotName = 'code-custom'
CustomCode.tagName = 'pre'
CustomCode.className = 'ql-syntax'

Quill.register('modules/CustomCode', CustomCode)

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

  const handleChange = (content: string) => {
    setContentValue(content)
    onChange?.(content)
  }

  // Trong thành phần QuillCustom
  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value
      },
      toolbar: toolbarOptions,
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
      },
      CustomCode: {}
    }),
    [userInfo?.id]
  )

  useEffect(() => {
    setContentValue(value)
  }, [value])

  return (
    <ReactQuill
      value={contentValue}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      theme={theme || 'snow'}
      placeholder={placeholder}
    />
  )
}
