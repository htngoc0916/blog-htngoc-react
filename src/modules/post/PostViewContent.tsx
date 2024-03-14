import { useRef } from 'react'
import { PostViewContentLeft, PostViewContentMain } from '.'
import { Button, Tooltip } from 'flowbite-react'
import { IconFacebook } from '~/components/icons'
import { HiOutlineHeart } from 'react-icons/hi2'

export default function PostViewContent() {
  const contentRef = useRef(null)
  return (
    <div id='post-detail__content' className='grid grid-cols-1 gap-2 lg:pt-16 lg:grid-cols-12'>
      <div className='lg:col-span-1 sticky top-[140px]'>
        <div className='flex flex-col items-center justify-center gap-2 '>
          <Tooltip content='Chia sẽ bài viết đến trang Facebook' placement='right'>
            <Button color='secondary' pill className='flex items-center justify-center w-10 h-10'>
              <IconFacebook className='text-xl text-text5'></IconFacebook>
            </Button>
          </Tooltip>

          <Tooltip content='Yêu thích bài viết này' placement='right'>
            <Button color='secondary' pill className='flex items-center justify-center w-10 h-10'>
              <HiOutlineHeart className='text-xl text-text5'></HiOutlineHeart>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className='lg:col-span-8'>
        <PostViewContentMain contentRef={contentRef}></PostViewContentMain>
      </div>

      <div className='hidden lg:col-span-3 lg:block'>
        <PostViewContentLeft contentRef={contentRef}></PostViewContentLeft>
      </div>
    </div>
  )
}
