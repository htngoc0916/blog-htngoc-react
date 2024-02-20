export interface HtmlContentProps {
  content: any
}

export default function HtmlContent({ content }: HtmlContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
