import { PostViewContentLeft, PostViewContentMain } from '.'

export default function PostViewContent() {
  return (
    <div className='grid grid-cols-1 gap-2 pt-16 lg:grid-cols-12'>
      <div className='hidden lg:col-span-2 lg:block'>
        <PostViewContentLeft></PostViewContentLeft>
      </div>
      <div className='lg:col-span-10'>
        <PostViewContentMain></PostViewContentMain>
      </div>
    </div>
  )
}
