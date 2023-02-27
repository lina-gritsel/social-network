import { useState } from "react"

export const useModal = () => {
    const [visible, setVisible] = useState<boolean>(false)
  
    return {
      visible,
      close: () => setVisible(false),
      open: () => setVisible(true),
    }
  }
  