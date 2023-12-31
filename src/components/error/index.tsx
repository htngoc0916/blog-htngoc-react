export interface ErrorFallBackProps {}

export default function ErrorFallBack(props: ErrorFallBackProps) {
  return (
    <div className='flex items-center justify-start px-3 text-red-500 bg-red-100 rounded-sm'>
      Look like component is error
    </div>
  )
}
