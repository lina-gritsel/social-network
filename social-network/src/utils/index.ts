import { followUser, unsubsribeUser } from '../api'
import { useAppDispatch } from '../store'
import { fetchUser } from '../store/actions'

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

export const getRandomElemArr = (quantity: number, maxInt: number) => {
  let randElem: number
  const newElements: number[] = []
  for (let i = 0; i < quantity; i++) {
    randElem = getRandomInt(0, maxInt + 1)
    while (newElements.indexOf(randElem) !== -1) {
      randElem = getRandomInt(0, maxInt + 1)
    }
    newElements.push(randElem)
  }
  return newElements
}

export const pressEnter = (e, func: (params?) => void) => {
  const value = (e.target as HTMLInputElement).value
  if (e.key === 'Enter' && value !== '') {
    func()
    e.target.value = ''
  }
}

export const changeFollow = async (
  isTrue: boolean,
  userInfo: any,
  currentUserId: any,
  setIsFollowing?: (boolean) => void,
) => {
  const dispatch = useAppDispatch()

  isTrue
    ? await unsubsribeUser(userInfo?.id, { currentUserId })
    : await followUser(userInfo?.id, { currentUserId })
  dispatch(fetchUser(userInfo?.id))
}
