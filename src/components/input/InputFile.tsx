import { FileInput, Label } from 'flowbite-react'
import { twMerge } from 'tailwind-merge'
import { HiOutlineCloudArrowUp } from 'react-icons/hi2'
import { useDropzone } from 'react-dropzone'

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

export default function InputFile({
  className,
  color = 'primary',
  size = 'sm',
  content = 'SVG, PNG, JPG or GIF (MAX. 800x400px)'
}: InputFileProps) {
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles) => {}
  })

  // const acceptedFileItems = acceptedFiles.map((file: File) => {
  //   console.log('🚀 ~ file: InputFile.tsx:66 ~ files ~ file:', file)
  //   return (
  //     <li key={file.name}>
  //       {file.name} - {file.size} bytes
  //     </li>
  //   )
  // })

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <div className={twMerge(classes.base, className)}>
      <Label
        htmlFor='dropzone-file'
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
          <ul className='px-4 py-1 mt-3 bg-red-300 rounded-md'> {fileRejectionItems}</ul>
        </div>
        <FileInput id='dropzone-file' className='hidden' {...getInputProps()} />
      </Label>
    </div>
  )
}
