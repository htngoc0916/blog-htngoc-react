// useUploadQuill.ts
import { useMemo } from 'react'
import hljs from 'highlight.js'
import ImageUploader from 'quill-image-uploader'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
import { Quill } from 'react-quill'

hljs.configure({
  languages: ['javascript', 'java', 'python', 'node']
})

Quill.register('modules/imageUploader', ImageUploader)

export const useQuillUploadImage = () => {
  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value
      },
      toolbar: [
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
        upload: (file: File) => {
          return new Promise((resolve, reject) => {
            // Your upload logic here
            setTimeout(() => {
              resolve(
                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png'
              )
            }, 3500)
          })
        }
      }
    }),
    []
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
