export const getRandomInt = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const dateConversion = (date) => {
  const newDate = new Date(date)

  return newDate.toLocaleDateString('ru-Ru', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

export const sortNews = (a: string, b: string) => {
  const dateFirst = new Date(a)
  const dateLast = new Date(b)
  return dateLast.getTime() - dateFirst.getTime()
}
