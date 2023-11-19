export function cls(input: string) {
  return input
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim()
}
