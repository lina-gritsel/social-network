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

export const getRandomElemArr = (number: number) => {
  let randElem: number
  const newElements: number[] = []
  for (let i = 0; i < number; i++) {
    randElem = getRandomInt(0, number + 1)
    while (newElements.indexOf(randElem) !== -1) {
      randElem = getRandomInt(0, number + 1)
    }
    newElements.push(randElem)
  }
  return newElements
}

