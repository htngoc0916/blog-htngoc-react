export interface IPostImageProps {}

export default function PostImage() {
  return (
    <div className='rounded-lg md:max-h-img-lg max-h-img-md md:rounded-xl'>
      <img src='/img/image_1.jpg' alt='post banner' className='object-cover w-full h-full rounded-lg md:rounded-xl' />
    </div>
  )
}
