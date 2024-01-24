import { twMerge } from 'tailwind-merge'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { FileRejection, useDropzone } from 'react-dropzone'
import { memo, useCallback } from 'react'
import { toast } from 'react-toastify'

const classes = {
  base: 'flex items-center justify-center w-full',
  label: {
    base: 'flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer ',
    color: {
      primary:
        'border-primary-300 dark:hover:bg-bray-800 bg-gray-50 hover:bg-gray-100 dark:border-primary-600 dark:bg-gray-700 dark:hover:border-primary-500 dark:hover:bg-gray-600',
      default:
        'border-gray-300 dark:hover:bg-bray-800 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
    },
    size: {
      sm: '',
      md: 'h-64'
    }
  },
  children: {
    base: 'flex flex-col items-center justify-center pt-5 pb-6',
    color: {
      primary: 'w-8 h-8 mb-4 text-primary-500 dark:text-primary-400',
      default: 'w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
    }
  },
  content: {
    base: 'font-semibold mb-2 text-sm',
    primary: 'text-primary-500 dark:text-primary-400',
    default: 'text-sm text-gray-500 dark:text-gray-400'
  }
}

const maxSize = 1048576

export interface InputFileProps {
  className?: string
  size?: 'sm' | 'md'
  color?: 'default' | 'primary'
  content?: string
  onFileUpload?: (file: File) => void
}

const InputFile = memo(function InputFile(props: InputFileProps) {
  const { className, color = 'primary', size = 'sm', content = '', onFileUpload } = props

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      onFileUpload?.(file)
    }
  }, [])

  // const onDrop = (acceptedFiles: File[]) => {

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const file = fileRejections[0]
    toast.error(file.errors[0].message)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { 'image/*': [] },
    maxSize: maxSize,
    maxFiles: 1
  })

  return (
    <div className={twMerge(classes.base, className)}>
      <div
        className={twMerge(classes.label.base, classes.label.color[color], classes.label.size[size])}
        {...getRootProps()}
      >
        <div className={twMerge(classes.children.base)}>
          <HiOutlineCloudArrowUp className={classes.children.color[color]}></HiOutlineCloudArrowUp>
          <p>
            <span className={twMerge(classes.content.base, classes.content[color])}>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{content}</p>
        </div>

        <input id='dropzone-file' className='hidden' {...getInputProps()} />
        {/* <div id='file-rejection'>{fileRejectionItems}</div> */}
      </div>
    </div>
  )
})

export default InputFile
