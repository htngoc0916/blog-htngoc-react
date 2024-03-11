import slugify from 'slugify'
import { Tag } from '~/types'
import { CardTag } from '.'

export interface TagGroupProps {
  data: Tag[]
}

export default function TagGroup({ data }: TagGroupProps) {
  return (
    <div id='tags' className='flex gap-2 mb-3'>
      {data.map((tag: Tag) => (
        <CardTag key={tag?.tagName} color={tag?.color} href={`/category/${slugify(tag?.tagName || '')}`}>
          {tag?.tagName}
        </CardTag>
      ))}
    </div>
  )
}
