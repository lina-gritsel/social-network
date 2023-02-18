import { useState } from 'react'

export const useCategoriesTabs = () => {
  const [category, setCategory] = useState<string>('general')

  const onChangeCategory = (value: string): void => {
    setCategory(value)
  }

  return {
    category,
    onChangeCategory,
  }
}
