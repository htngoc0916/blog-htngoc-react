import { Blockquote } from 'flowbite-react'
import { IconBlockQoute } from '~/components/icons'

export interface IPostContentMainProps {}

export default function PostContentMain() {
  return (
    <div className='h-screen max-w-screen-xl'>
      <div className='text-xl font-bold md:text-2xl'>Thiết lập môi trường đầu tiên cho vs code</div>
      <div className='pt-4 leading-7 md:text-lg lg:leading-9'>
        Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget
        vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu
        amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo lacinia pharetra,
        semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
        enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum
        molestie aliquet sodales id est ac volutpat.
      </div>

      <Blockquote className='p-4 my-4 text-lg border-l-4 border-primary-400 bg-primary-50 dark:border-primary-500 dark:bg-gray-800'>
        <IconBlockQoute></IconBlockQoute>
        <p>
          "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to
          complex dashboard. Perfect choice for your next SaaS application."
        </p>
      </Blockquote>
    </div>
  )
}
