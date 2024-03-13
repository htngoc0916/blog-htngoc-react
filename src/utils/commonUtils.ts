function convertToYYYYMMDD(prams: Date | string): string {
  const dateObject = typeof prams === 'string' ? new Date(prams) : prams

  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return ''
  }

  const year: number = dateObject.getFullYear()
  const month: string = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day: string = String(dateObject.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export { convertToYYYYMMDD }
