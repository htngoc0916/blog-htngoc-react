import { Button } from 'flowbite-react'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <section className='dark:bg-darkbg2'>
      <div className='grid items-center justify-center h-screen grid-cols-1 p-4 mx-auto md:p-10 lg:grid-cols-2 max-w-screen-2xl'>
        <div className='flex flex-col items-center justify-end'>
          <div className='py-3'>
            <p className='text-2xl font-bold md:text-4xl'>Oops.... 🧐</p>
            <div className='pt-3 text-xl font-medium md:text-2xl'>Trang này không tồn tại hoặc đã xoá. </div>
            <h3 className='pt-5 text-lg'>Xin lỗi vì sự bất tiện này.</h3>
            <div className='flex pt-5'>
              <Button gradientDuoTone='primary' onClick={() => navigate('/')}>
                <HiOutlineArrowLeft className='w-5 h-5 mr-2' />
                Về lại trang chủ
              </Button>
            </div>
          </div>
        </div>

        <div className=''>
          <img src='/img/page404.png' alt='404 page' className='w-full' />
        </div>
      </div>
    </section>
  )
}
