import React, { FC } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface LoaderProps {
  className: string
}

const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <Box className={className}>
      <CircularProgress />
    </Box>
  )
}

export default Loader
