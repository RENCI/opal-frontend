import { useCallback } from 'react'
import { useLocalStorage } from '@hooks'

export const useToggleLocalStorage = key => {
  const [value, setValue] = useLocalStorage(key, false)
  const toggleValue = useCallback(() => setValue(!value), [value])
  const setTrue = useCallback(() => setValue(true), [value])
  const setFalse = useCallback(() => setValue(false), [value])

  return {
    enabled: value,
    disabled: !value,
    toggle: toggleValue,
    set: setTrue,
    unset: setFalse,
  }
}
