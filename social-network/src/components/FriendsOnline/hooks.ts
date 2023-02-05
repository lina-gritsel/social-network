import { useEffect, useState } from 'react'

const useDebounce = (value: string, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debounceValue
}

export default useDebounce