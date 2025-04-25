import { useCallback, useState } from 'react'

export const useToggleState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const toggleValue = useCallback(() => setValue(!value), [value])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return {
    enabled: value,
    disabled: !value,
    toggle: toggleValue,
    set: setTrue,
    unset: setFalse,
  }
}

/*
  Usage:

  const someOption = useToggleState(false) // init
  
  someOption.toggle()                      // switch between true/false
  someOption.set()                         // set true
  someOption.unset()                       // set false
  someOption.enabled                       // bool whether true
  someOption.disabled                      // bool whether false
*/