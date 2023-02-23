import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface LoaderProps {
  className?: string
  classNameCircular?: string
}

const Loader: FC<LoaderProps> = ({ className, classNameCircular }) => {
  return (
    <Box className={className}>
      <CircularProgress className={classNameCircular}/>
    </Box>
  )
}

export default Loader
