import { twMerge } from 'tailwind-merge'
import { DefaultProps } from '~/utils/defautProp'

const classess = {
  base: 'flex gap-2 mb-8',
  horizontally: {
    on: 'flex-row items-center',
    off: 'flex-col'
  }
}
export interface IFieldProps extends DefaultProps {
  horizontally?: boolean
}

export default function Field(props: IFieldProps) {
  const { className, horizontally = false, children } = props
  return (
    <div
      className={twMerge(classess.base, horizontally ? classess.horizontally.on : classess.horizontally.off, className)}
    >
      {children}
    </div>
  )
}
