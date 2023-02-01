import { useState, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'

export const useRegistrationForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      date: '',
      gender: '',
    },
  })

  const onSubmit = (data) => console.log(data)

  const [showPassword, setShowPassword] = useState(false)

  const onChangeShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return {
    control,
    showPassword,
    onSubmit,
    handleSubmit,
    onChangeShowPassword,
    handleMouseDownPassword,
  }
}
