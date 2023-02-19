import { Dispatch, SetStateAction, useState } from 'react'

import { changePost, createPost } from '../../../api'

type UseCreatePost = ({
  content,
  image,
  editMode,
  id,
  userId,
  setIsAllPosts,
}: {
  content: string
  image: string
  editMode: boolean
  id: string
  userId: string
  setIsAllPosts: Dispatch<SetStateAction<boolean>>
}) => {
  onSubmit: () => Promise<void>
  contentInput: string
  currentImg: string
  setContentInput: Dispatch<SetStateAction<string>>
  onEmojiSelect: (e: any) => void
  setCurrentImg: Dispatch<SetStateAction<string>>
}

export const useCreatePost: UseCreatePost = ({
  content,
  image,
  editMode,
  id,
  userId,
  setIsAllPosts,
}) => {
  const [contentInput, setContentInput] = useState<string>(content || '')
  const [currentImg, setCurrentImg] = useState<string>(image || '')

  const onSubmit = async () => {
    const params = {
      content: contentInput,
      image: currentImg,
    }

    if (editMode) {
      await changePost({ ...params }, id)
    } else {
      await createPost({ ...params, userId })
    }

    setContentInput('')
    setCurrentImg('')
    setIsAllPosts((prev) => !prev)
  }

  const onEmojiSelect = (e) => {
    setContentInput((prev) => prev + e.native)
  }

  return {
    onSubmit,
    contentInput,
    currentImg,
    setContentInput,
    onEmojiSelect,
    setCurrentImg,
  }
}

export const useEmojiModal = () => {
  const [isVisible, setVisible] = useState<boolean>(false)

  return {
    isVisible,
    close: () => setVisible(false),
    open: () => setVisible(true),
  }
}

export const useAddImageModal = () => {
  const [isVisible, setVisible] = useState<boolean>(false)

  return {
    isVisible,
    close: () => setVisible(false),
    open: () => setVisible(true),
  }
}
