import { PostContentLeft, PostContentMain } from '.'

export interface IPostContentProps {}

export default function PostContent() {
  return (
    <div className='grid grid-cols-1 gap-2 pt-16 lg:grid-cols-12'>
      <div className='hidden lg:col-span-2 lg:block'>
        <PostContentLeft></PostContentLeft>
      </div>
      <div className='lg:col-span-10'>
        <PostContentMain></PostContentMain>
      </div>
    </div>
  )
}
