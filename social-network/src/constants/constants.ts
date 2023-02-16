export const getRandomInt = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRandomColor = (): string => {
  return `rgb(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, ${getRandomInt(
    0,
    256,
  )})`
}

export const dateConversion = (date) => {
  const newDate = new Date(date)

  return newDate.toLocaleDateString('ru-Ru', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const sortNews = (a: string, b: string) => {
  const dateOne = new Date(a)
  const dateTwo = new Date(b)
  return dateTwo.getTime() - dateOne.getTime()
}
export const sortBirthday = (a: string, b: string) => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/
  const dateOne = new Date(a.replace(pattern, '$3-$2-$1'))
  const dateTwo = new Date(b.replace(pattern, '$3-$2-$1'))
  return dateOne.getTime() - dateTwo.getTime()
}
