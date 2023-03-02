import { useState } from 'react'

export const useCategoriesTabs = () => {
  const [category, setCategory] = useState<string>('top')

  const onChangeCategory = (value: string): void => {
    setCategory(value)
  }

  return {
    category,
    onChangeCategory,
  }
}
