import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

interface progressCircleProps {
  progress?: number
  size?: number
}

const ProgressCircle = ({ progress = 0.3, size = 100 }: progressCircleProps) => {
  const theme = useTheme()
  const [angle, setAngle] = useState(0)
  const [displayPercent, setDisplayPercent] = useState(0)

  if (progress < 0) {
    progress = 0
  }
  useEffect(() => {
    const targetAngle = progress * 360
    let currentAngle = 0
    let currentPercent = 0

    const timer = setInterval(() => {
      if (currentAngle >= targetAngle) {
        clearInterval(timer)
        return
      }

      currentAngle += 5
      currentPercent = Math.floor((currentAngle / 360) * 100)
      setAngle(currentAngle)
      setDisplayPercent(currentPercent)
    }, 20)

    return () => {
      clearInterval(timer)
    }
  }, [progress])

  return (
    <Box
      sx={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Box
        sx={{
          background: `radial-gradient(${theme.palette.background.paper} 55%, transparent 56%),
                      conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.primary.light} ${angle}deg 360deg),
                      ${theme.palette.primary.main}`,
          borderRadius: '50%',
          width: '100%',
          height: '100%',
          transition: 'background 0.5s ease',
        }}
      />
      <Typography
        variant='h6'
        component='div'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {displayPercent}%
      </Typography>
    </Box>
  )
}

export default ProgressCircle
