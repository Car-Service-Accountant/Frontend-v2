import { Box, Fade, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
type BoxSpawnerProps = {
  boxes: React.ReactNode[]
}

const BoxSpawner = ({ boxes }: BoxSpawnerProps) => {
  const [visibleBoxes, setVisibleBoxes] = useState<React.ReactNode[]>([])
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleBoxes((prevVisibleBoxes) => {
        if (prevVisibleBoxes.length < boxes.length && prevVisibleBoxes.length < 7) {
          return [...prevVisibleBoxes, boxes[prevVisibleBoxes.length]]
        } else {
          clearInterval(timer)
          return prevVisibleBoxes
        }
      })
    }, 500) // Adjust the delay between each box appearance here (in milliseconds)

    return () => {
      clearInterval(timer)
    }
  }, [boxes])

  return (
    <Box width={isMobile ? 'fit-content' : 'auto'}>
      {visibleBoxes.map((box, index) => (
        <Fade in={true} key={index}>
          <Box>{box}</Box>
        </Fade>
      ))}
    </Box>
  )
}

export default BoxSpawner
