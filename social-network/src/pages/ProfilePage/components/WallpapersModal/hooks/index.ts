export {}
// export const useWallpaperModal = () => {
//   const userId = (JSON.parse(localStorage.getItem('userId')) as string) || ''
//   const { inputRef, isDisabled, setIsDisabled } = useModalContent()

//   const handleClickImg = (e: MouseEvent) => {
//     setBgImage((e.target as HTMLImageElement).src)
//     setIsErrorImg(false)
//   }

//   const handleClickBtn = () => {
//     const newImg = inputRef.current.value.trim()
//     setBgImage(newImg)
//     setBgImageArr((prev) => (prev.includes(newImg) ? prev : [...prev, newImg]))
//     inputRef.current.value = ''
//   }

//   const onChangeInput = () => {
//     setIsErrorImg(false)
//     inputRef.current.value.trim() === ''
//       ? setIsDisabled(true)
//       : setIsDisabled(false)
//   }

//   const deleteImg = async (e: MouseEvent) => {
//     const index = (e.currentTarget as HTMLElement).id
//     const indexNumber = parseFloat(index)
//     const newImageArr = bgImageArr.filter((img, index) => index !== indexNumber)
//     setBgImageArr(newImageArr)
//     const wallpapers = newImageArr.filter(
//       (el, index) => index >= DEFAULT_NUMBER_PICTURES,
//     )
//     await changeUser({ wallpapers: wallpapers }, userId)
//   }

//   return {

//   }
// }
