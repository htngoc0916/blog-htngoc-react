function truncateText(text: string, maxLength: number) {
  if (text) {
    if (text.length <= maxLength) {
      return text
    }
    return text.slice(0, maxLength) + '...'
  }
  return ''
}

export default truncateText
