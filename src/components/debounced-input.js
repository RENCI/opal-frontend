import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue)

  // update internal state when incoming value changes
  useEffect(() => setValue(initialValue), [initialValue])

  // invoke onChange callback when internal state changes
  useEffect(() => {
    const changeTimer = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(changeTimer)
  }, [value])

  return (
    <input
      { ...props }
      value={ value }
      onChange={ e => setValue(e.target.value) }
    />
  )
}

DebouncedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
}

