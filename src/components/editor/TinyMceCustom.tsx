import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react'
import slugify from 'slugify'
import { CLOUDINARY_UPLOAD } from '~/apis/apiConstanst'
import fileUpload from '~/apis/fileUploadApi'
import { userInfoSelector } from '~/app/auth/authSlice'
import { useAppSelector } from '~/app/hooks'
import { PostSlectedMeta } from '~/modules/post/PostDetailForm'
import { API_STATUS, ApiResponseDTO, FileMaster, UploadFileRequest } from '~/types'

export interface TinyMceCustomProps {
  value?: string
  placeholder: string
  onChange: (content: string) => void
  selectedMeta: (meta: PostSlectedMeta) => void
}

export default function TinyMceCustom(props: TinyMceCustomProps) {
  const { value, placeholder, onChange, selectedMeta } = props
  const userInfo = useAppSelector(userInfoSelector)
  const apiKey = import.meta.env.VITE_TINY_MCE_EDITOR
  const editorRef = useRef<Editor>(null)

  const [contentEditor, setContentEditor] = useState<string>()
  useEffect(() => {
    setContentEditor(value)
  }, [value])

  const handleEditorChange = (content: string) => {
    onChange?.(content)
    setContentEditor(content)
  }

  const handleImageUpload = (blobInfo: any, _progress: any): Promise<string> =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      const formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      try {
        const file: File = blobInfo.blob()
        if (!file) {
          reject('Failed to convert blob to File.')
          return
        }
        const postUploadRequest: UploadFileRequest = {
          id: userInfo?.id || 0,
          file: file
        }

        const response: ApiResponseDTO<FileMaster> = await fileUpload.uploadImage(postUploadRequest)

        if (response?.status.includes(API_STATUS.SUCCESS)) {
          resolve(response.data.fileUrl)
        } else {
          reject(`HTTP Error: ${response.status}`)
        }
      } catch (error) {
        reject(`Image upload failed: ${error}`)
      }
    })

  // const handleAddPostMeta = () => {
  //   if (editorRef.current) {
  //     const editor = editorRef.current.editor
  //     const selectedHTML = editor?.selection.getContent({ format: 'html' })
  //     console.log('🚀 ~ handleAddPostMeta ~ selectedHTML:', selectedHTML)
  //     const selectedText = editor?.selection.getContent({ format: 'text' })

  //     if (selectedText && selectedText.trim() !== '') {
  //       selectedMeta?.({ key: slugify(selectedText), value: selectedText })
  //     }
  //   }
  // }

  const handleAddPostMeta = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor
      const selectedText = editor?.selection.getContent({ format: 'text' })

      if (selectedText && selectedText.trim() !== '') {
        const idValue = slugify(selectedText)
        editor?.execCommand('mceInsertContent', false, `<h3 id="${idValue}">${selectedText}</h3>`)
        selectedMeta?.({ key: idValue, value: selectedText })
      }
    }
  }

  return (
    <Editor
      ref={editorRef}
      apiKey={apiKey}
      init={{
        skin: 'oxide',
        icons: 'thin',
        height: 800,
        placeholder: placeholder,
        menubar: true,
        content_css: ['/src/assets/_content-editor.scss'],
        toolbar_mode: 'wrap',
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
          'codesample'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'link image media | blockquote codesample | ' +
          'removeformat | help | ' +
          'addPostMeta',
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        setup: function (editor) {
          editor.ui.registry.addButton('addPostMeta', {
            text: 'Meta',
            tooltip: 'Add post meta',
            enabled: true,
            onAction: handleAddPostMeta
          })
        },

        images_upload_url: `${CLOUDINARY_UPLOAD}/${userInfo?.id}/upload`,
        paste_data_images: true,
        automatic_uploads: true,
        images_reuse_filename: true,
        file_picker_types: 'image',
        images_upload_handler: handleImageUpload
      }}
      value={contentEditor}
      onEditorChange={handleEditorChange}
    />
  )
}
