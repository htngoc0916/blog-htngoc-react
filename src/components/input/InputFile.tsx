import { twMerge } from 'tailwind-merge'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { FileRejection, useDropzone } from 'react-dropzone'
import { ReactNode, memo, useCallback } from 'react'
import { toast } from 'react-toastify'
import { ActionClose } from '../action'
import { Spinner } from 'flowbite-react'

const classes = {
  base: 'flex items-center justify-center w-full',
  label: {
    base: 'flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer relative overflow-hidden',
    color: {
      primary:
        'border-primary-300 dark:hover:bg-bray-800 bg-gray-50 hover:bg-gray-100 dark:border-primary-600 dark:bg-gray-700 dark:hover:border-primary-500 dark:hover:bg-gray-600',
      default:
        'border-gray-300 dark:hover:bg-bray-800 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
    },
    size: {
      sm: 'h-32',
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

export interface InputFileProps {
  className?: string
  size?: 'sm' | 'md'
  color?: 'default' | 'primary'
  children?: ReactNode
  uploadUrl?: string
  onFileUpload?: (file: File) => void
  onFileDelete?: () => void
  maxSize?: number
  loading?: boolean
}

const InputFile = memo(function InputFile(props: InputFileProps) {
  const {
    className,
    color = 'primary',
    size = 'sm',
    children,
    onFileUpload,
    onFileDelete,
    uploadUrl,
    loading = false,
    maxSize = 1024 * 1024
  } = props

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onFileUpload?.(file)
      }
    },
    [onFileUpload]
  )

  // const onDrop = (acceptedFiles: File[]) => {})

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
    <div className={twMerge(classes.label.base, classes.label.color[color], classes.label.size[size], className)}>
      {loading ? (
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full rounded-lg z-1'>
          <Spinner color='purple' />
        </div>
      ) : (
        <>
          {uploadUrl ? (
            <div className='absolute top-0 left-0 w-full h-full rounded-lg z-1'>
              <div className='relative bg-white rounded-lg'>
                <div className={twMerge(classes.label.size[size])}>
                  <img
                    src={uploadUrl}
                    alt='upload image'
                    className='object-cover w-full h-full border-inherit'
                    loading='lazy'
                  />
                </div>
                <ActionClose
                  className='absolute p-1 bg-gray-100 rounded-sm top-1 right-1'
                  onClick={onFileDelete}
                ></ActionClose>
              </div>
            </div>
          ) : (
            <>
              <div className={twMerge(classes.children.base)} {...getRootProps()}>
                <HiOutlineCloudArrowUp className={classes.children.color[color]}></HiOutlineCloudArrowUp>
                {children}
              </div>
              <input id='dropzone-file' className='hidden' {...getInputProps()} />
            </>
          )}
        </>
      )}
    </div>
  )
})

export default InputFile
