import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef, useState } from 'react'

export interface TinyMceCustomProps {
  value?: string
  placeholder: string
  onChange: (content: string) => void
}

export default function TinyMceCustom(props: TinyMceCustomProps) {
  const { value, placeholder, onChange } = props
  const apiKey = import.meta.env.VITE_TINY_MCE_EDITOR

  const editorRef = useRef<Editor | null>(null)

  const [contentEditor, setContentEditor] = useState<string>()
  useEffect(() => {
    setContentEditor(value)
  }, [value])

  const handleEditorChange = (content: string, editor: any) => {
    // console.log('🚀 ~ handleEditorChange ~ editor:', editor)
    // console.log('🚀 ~ handleEditorChange ~ content:', content)
    onChange?.(content)
    setContentEditor(content)
  }

  return (
    <Editor
      apiKey={apiKey}
      init={{
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
          'removeformat | help',
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
        codesample_dialog_width: 600,
        paste_as_text: true,
        paste_block_drop: true
      }}
      value={contentEditor}
      onEditorChange={handleEditorChange}
    />
  )
}
