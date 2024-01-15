import { quantum } from 'ldrs'

export interface LoaderProps {
  className?: string
}

export default function Loader() {
  quantum.register()

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <l-quantum size='65' speed='3.0' color='#7e22ce'></l-quantum>
    </div>
  )
}
