import { Control, useController } from 'react-hook-form'
import { SelectOption } from './inputSelectOptions'
import Select, { StylesConfig } from 'react-select'
import chroma from 'chroma-js'
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
  },
  multiValue: (styles, { data }) => {
    let bgColor = 'cyan'
    try {
      const color = chroma(data.color)
      bgColor = color.alpha(0.3).css()
    } catch (error) {
      // console.log(error)
    }

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
  isMulti?: true | undefined
  data: SelectOption[]
  value?: string[]
}

const InputSelect = memo(function InputSelect(props: InputSelectProps) {
  const { control, name, onChange, data, value, isMulti = undefined, ...rest } = props
  console.log('🚀 ~ InputSelect ~ value:', value)

  const { field } = useController({
    control,
    name
  })

  const [selecetd, setSelected] = useState<SelectOption[]>()

  const handleOnChange = (selectedOption: SelectOption[] | any) => {
    if (selectedOption) {
      setSelected(selectedOption)
      onChange?.(selectedOption)
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
      isMulti={isMulti}
      {...field}
      {...rest}
      onChange={handleOnChange}
      value={selecetd}
    />
  )
})
export default InputSelect
