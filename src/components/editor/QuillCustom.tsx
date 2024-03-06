// import 'highlight.js/styles/atom-one-dark.css'
// import 'react-quill/dist/quill.snow.css'
// import 'quill-image-uploader/dist/quill.imageUploader.min.css'

// import { useEffect, useMemo, useState } from 'react'
// import ReactQuill, { Quill } from 'react-quill'
// import ImageUploader from 'quill-image-uploader'
// import { toast } from 'react-toastify'
// import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types'
// import fileUpload from '~/apis/fileUploadApi'
// import { useAppSelector } from '~/app/hooks'
// import { userInfoSelector } from '~/app/auth/authSlice'
// Quill.register('modules/imageUploader', ImageUploader)
// import hljs from 'highlight.js'

// hljs.configure({
//   languages: ['javascript', 'python', 'java', 'sql']
// })

// const formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
//   'code-block',
//   'color',
//   'background',
//   'align'
// ]

// const toolbarOptions = [
//   [{ header: 1 }, { header: 2 }],
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],

//   ['bold', 'italic', 'underline', 'strike'],
//   ['blockquote', 'code-block'],
//   ['link', 'image', 'video', 'formula'],

//   [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
//   [{ indent: '-1' }, { indent: '+1' }],
//   [{ direction: 'rtl' }],

//   [{ color: [] }, { background: [] }],
//   [{ align: [] }],

//   ['clean']
// ]
// export interface QuillCustomProps {
//   value?: string
//   placeholder?: string
//   onChange?: (content: string) => void
//   theme?: string
// }

// export default function QuillCustom(props: QuillCustomProps) {
//   const { value = '', placeholder, onChange, theme } = props
//   const userInfo = useAppSelector(userInfoSelector)
//   const [contentValue, setContentValue] = useState<string>('')

//   useEffect(() => {
//     setContentValue(value)
//   }, [value])

//   const handleChange = (content: string) => {
//     setContentValue(content)
//     onChange?.(content)
//   }

//   const hanldeImageUpload = async (file: File) => {
//     const postUploadRequest: UploadFileRequest = {
//       id: userInfo?.id || 0,
//       file
//     }

//     try {
//       const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadImage(postUploadRequest)

//       if (response?.status.includes(API_STATUS.SUCCESS)) {
//         return response.data.fileUrl
//       } else {
//         toast.error(response.message)
//         return ''
//       }
//     } catch (error) {
//       toast.error('Upload error')
//       console.error(error)
//     }
//   }

//   const modules = useMemo(
//     () => ({
//       syntax: {
//         highlight: (text: string) => hljs.highlightAuto(text).value
//       },
//       toolbar: {
//         container: toolbarOptions
//       },
//       clipboard: {
//         matchVisual: false
//       },
//       imageUploader: {
//         upload: hanldeImageUpload
//       }
//     }),
//     []
//   )

//   return (
//     <ReactQuill
//       value={contentValue}
//       onChange={handleChange}
//       modules={modules}
//       formats={formats}
//       theme={theme || 'snow'}
//       placeholder={placeholder}
//     />
//   )
// }

// Import các thư viện và component cần thiết
import { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
import ImageUploader from 'quill-image-uploader'
import hljs from 'highlight.js'
import { toast } from 'react-toastify'
import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types' // Thay thế bằng đường dẫn thực tế
import fileUpload from '~/apis/fileUploadApi' // Thay thế bằng đường dẫn thực tế
import { useAppSelector } from '~/app/hooks' // Thay thế bằng đường dẫn thực tế
import { userInfoSelector } from '~/app/auth/authSlice' // Thay thế bằng đường dẫn thực tế

// Đăng ký plugin ImageUploader cho ReactQuill
ReactQuill.Quill.register('modules/imageUploader', ImageUploader)

// Cấu hình ngôn ngữ cho highlight.js
hljs.configure({
  languages: ['javascript', 'python', 'java', 'sql']
})

// Các định dạng và options cho ReactQuill
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

// Hàm highlight code sử dụng highlight.js
const highlightCode = (text: string) => hljs.highlightAuto(text).value

// Interface cho props của component
export interface QuillCustomProps {
  value?: string
  placeholder?: string
  onChange?: (content: string) => void
  theme?: string
}

// Component chính
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

  // const handleCustomCodeBlock = () => {
  //   const editor = quillRef.current?.getEditor()
  //   console.log('🚀 ~ handleCustomCodeBlock ~ editor:', editor)

  //   if (editor) {
  //     const format = 'code-block'
  //     const range = editor.getSelection(true)

  //     // Kiểm tra xem con trỏ có ở bên trong khối lệnh block không
  //     const isInsideCodeBlock = editor.getFormat(range).code === true

  //     // Di chuyển con trỏ ra khỏi khối lệnh block nếu đang ở bên trong
  //     if (isInsideCodeBlock) {
  //       editor.format(format, false)
  //     } else {
  //       editor.format(format, true)
  //     }
  //   }
  // }

  // ...
  const handleCustomCodeBlock = () => {
    const editor = quillRef.current?.getEditor()

    if (editor) {
      const format = 'code-block'
      const range = editor.getSelection(true)
      console.log('🚀 ~ handleCustomCodeBlock ~ range:', range)
      const isInsideCodeBlock = editor.getFormat(range).code === true
      console.log('🚀 ~ handleCustomCodeBlock ~ isInsideCodeBlock:', isInsideCodeBlock)

      if (isInsideCodeBlock) {
        console.log('🚀 ~ handleCustomCodeBlock ~ isInsideCodeBlock:', isInsideCodeBlock)
        const codeContent = editor.getContents(range.index, range.length)
        const newContent = `<pre><code>${JSON.stringify(codeContent)}</code></pre>`
        editor.clipboard.dangerouslyPasteHTML(range.index, newContent, 'user')
        editor.deleteText(range.index, range.length, 'user')
      } else {
        editor.format(format, true)
      }
    }
  }

  // ...

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
