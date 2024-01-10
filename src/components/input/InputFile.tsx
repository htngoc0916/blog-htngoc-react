import { FileInput, Label } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { useDropzone } from 'react-dropzone'
import { forwardRef, useEffect, useState } from 'react'

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

export interface InputFileProps {
  className?: string
  size?: 'sm' | 'md'
  color?: 'default' | 'primary'
  content?: string
  onFileUpload?: (file: File) => void
}

const InputFile = forwardRef<HTMLLabelElement, InputFileProps>((props, ref) => {
  const { className, color = 'primary', size = 'sm', content = 'SVG, PNG, JPG or GIF (MAX. 800x400px)' } = props
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    // Cleanup function to be executed when component unmounts
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage)
      }
    }
  }, [uploadedImage])

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  })

  return (
    <div className={twMerge(classes.base, className)}>
      <Label
        htmlFor='dropzone-file'
        className={twMerge(classes.label.base, classes.label.color[color], classes.label.size[size])}
        {...getRootProps()}
        ref={ref}
      >
        <div className={twMerge(classes.children.base)}>
          <HiOutlineCloudArrowUp className={classes.children.color[color]}></HiOutlineCloudArrowUp>
          <p>
            <span className={twMerge(classes.content.base, classes.content[color])}>Click to upload</span> or drag and
            drop
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{content}</p>
        </div>
        <FileInput id='dropzone-file' className='hidden' {...getInputProps()} />
      </Label>

      {uploadedImage && (
        <div>
          <p>Uploaded Image:</p>
          <img src={uploadedImage} alt='Uploaded' />
        </div>
      )}
    </div>
  )
})

export default InputFile
