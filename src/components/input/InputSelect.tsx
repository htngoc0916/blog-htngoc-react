import { Control, useController } from 'react-hook-form'
import { ColourOption, colourOptions } from './input-data'
import Select, { StylesConfig } from 'react-select'

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 16,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 16,
    width: 16
  }
})

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (base) => ({
    ...base,
    '*': {
      boxShadow: 'none !important'
    }
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
}

export interface InputSelectProps {
  name: string
  control?: Control<any>
  onChange?: (value: ColourOption) => void
}

export default function InputSelect(props: InputSelectProps) {
  const { control, name, onChange, ...rest } = props

  const { field } = useController({
    control,
    name
  })

  const handleOnChange = (selectedOption: ColourOption[] | any) => {
    field.onChange(selectedOption as ColourOption)
    if (onChange) {
      onChange(selectedOption)
    }
  }

  return (
    <Select
      closeMenuOnSelect={true}
      options={colourOptions}
      styles={colourStyles}
      placeholder=''
      className='input-select-container'
      classNamePrefix='input-select'
      isSearchable
      {...field}
      {...rest}
      onChange={handleOnChange}
      // defaultValue={colourOptions[0]}
      value={colourOptions.find((option) => option.value === field.value)}
    />
  )
}
