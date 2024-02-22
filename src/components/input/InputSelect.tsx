import { Control, useController } from 'react-hook-form'
import { SelectOption } from './inputSelectOptions'
import Select, { StylesConfig } from 'react-select'
import { memo, useEffect, useState } from 'react'

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

const colourStyles: StylesConfig<SelectOption, true> = {
  control: (base) => ({
    ...base,
    '*': {
      boxShadow: 'none !important'
    }
  }),
  singleValue: (styles, { data }) => {
    return { ...styles, ...dot(data.color) }
  }
}

export interface InputSelectProps {
  name: string
  control?: Control<any>
  onChange?: (value: SelectOption) => void
  data: SelectOption[]
}

const InputSelect = memo(function InputSelect(props: InputSelectProps) {
  const { control, name, onChange, data, ...rest } = props

  const { field } = useController({
    control,
    name
  })

  const handleOnChange = (selectedOption: SelectOption | any) => {
    onChange?.(selectedOption)
  }

  return (
    <Select
      closeMenuOnSelect={true}
      options={data}
      styles={colourStyles}
      placeholder=''
      className='input-select-container'
      classNamePrefix='input-select'
      isSearchable
      {...field}
      {...rest}
      onChange={handleOnChange}
      value={data?.filter((option) => option.value === field.value)}
      name={name}
    />
  )
})
export default InputSelect
