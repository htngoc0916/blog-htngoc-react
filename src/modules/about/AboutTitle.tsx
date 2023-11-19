export interface AboutTitleProps {
  className?: string
  children?: React.ReactNode
}

export function AboutTitle(props: AboutTitleProps) {
  const titleStyled = 'text-base font-medium text-primary-700 md:text-xl dark:text-text4'
  return <div className={`${titleStyled} ${props.className}`}>{props.children}</div>
}
export default AboutTitle
