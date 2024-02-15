export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export const colourOptions: SelectOption[] = [
  { value: 'purple', label: 'Purple', color: '#d8b4fe' },
  { value: 'cyan', label: 'Cyan', color: '#67e8f9', isFixed: true },
  { value: 'indigo', label: 'Indigo', color: '#a5b4fc' },
  { value: 'pink', label: 'Pirk', color: '#f9a8d4' },
  { value: 'light', label: 'Light', color: '#e2e8f0' },
  { value: 'green', label: 'Green', color: '#86efac' },
  { value: 'lime', label: 'Lime', color: '#bef264' },
  { value: 'red', label: 'Red', color: '#fca5a5' },
  { value: 'gray', label: 'Gray', color: '#d1d5db' },
  { value: 'teal', label: 'Teal', color: '#5eead4' },
  { value: 'gray', label: 'Gray', color: '#d1d5db' },
  { value: 'yellow', label: 'Yellow', color: '#fde047' },
  { value: 'failure', label: 'Failure', color: '#fca5a5', isDisabled: true }
]
