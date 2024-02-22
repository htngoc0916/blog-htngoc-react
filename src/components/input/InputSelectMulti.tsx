import { Control, useController } from 'react-hook-form'
import { SelectOption } from './inputSelectOptions'
import Select, { StylesConfig } from 'react-select'
import chroma from 'chroma-js'
import { memo, useEffect, useState } from 'react'

const colourStyles: StylesConfig<SelectOption, true> = {
  control: (base) => ({
    ...base,
    '*': {
      boxShadow: 'none !important'
    }
  }),
  multiValue: (styles, { data }) => {
    let bgColor = '#d1d5db'
    try {
      const color = chroma(data.color)
      bgColor = color.alpha(0.2).css()
      // eslint-disable-next-line no-empty
    } catch (error) {}

    return {
      ...styles,
      backgroundColor: bgColor
    }
  },
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white'
    }
  })
}

export interface InputSelectProps {
  name: string
  control?: Control<any>
  onChange?: (value: SelectOption[]) => void
  data: SelectOption[]
  value: string[]
}

const InputSelectMulti = memo(function InputSelectMulti(props: InputSelectProps) {
  const { control, name, onChange, data, value, ...rest } = props

  const { field } = useController({
    control,
    name
  })

  const [selecetd, setSelected] = useState<SelectOption[]>()

  const handleOnChange = (selectedOption: SelectOption[] | any) => {
    if (selectedOption) {
      onChange?.(selectedOption)
      setSelected(selectedOption)
    }
  }

  useEffect(() => {
    const values = data.filter((option) => value?.includes(option.value))
    setSelected(values)
  }, [value, data])

  return (
    <Select
      closeMenuOnSelect={true}
      options={data}
      styles={colourStyles}
      placeholder=''
      className='input-select-container'
      classNamePrefix='input-select'
      isSearchable
      isMulti
      {...field}
      {...rest}
      onChange={handleOnChange}
      value={selecetd}
      name={name}
    />
  )
})
export default InputSelectMulti
