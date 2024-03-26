import { useRef } from 'react'
import { PostViewContentRight, PostViewContentMain } from '.'
import { Button, Tooltip } from 'flowbite-react'
import { IconFacebook } from '~/components/icons'
import { HiOutlineHeart } from 'react-icons/hi2'

export default function PostViewContent() {
  const contentRef = useRef(null)
  return (
    <div id='post-detail__content' className='grid grid-cols-1 gap-2 lg:pt-16 lg:grid-cols-12'>
      <div className='order-2 lg:col-span-1 md:order-1'>
        <div className='sticky flex md:flex-col flex-row items-center justify-start gap-2 top-[140px]'>
          <Tooltip content='Chia sẽ bài viết đến trang Facebook' placement='right' className='lg:w-64'>
            <Button color='secondary' pill className='flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10'>
              <IconFacebook className='text-xl text-text5'></IconFacebook>
            </Button>
          </Tooltip>

          <Tooltip content='Yêu thích bài viết này' placement='right' className='lg:w-44'>
            <Button color='secondary' pill className='flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10'>
              <HiOutlineHeart className='text-xl text-text5'></HiOutlineHeart>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className='order-1 lg:col-span-8 md:order-2'>
        <PostViewContentMain contentRef={contentRef}></PostViewContentMain>
      </div>

      <div className='order-3 hidden lg:col-span-3 lg:block'>
        <PostViewContentRight contentRef={contentRef}></PostViewContentRight>
      </div>
    </div>
  )
}
