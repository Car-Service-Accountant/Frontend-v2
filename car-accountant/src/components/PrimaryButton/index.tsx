import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface primaryButtonProps {
  text: string
  link?: string
  small?: boolean
}

interface primaryButtonProps {
  text: string
  event?: React.MouseEventHandler<HTMLButtonElement>
  onClick?: () => void
  small?: boolean
  height?: string
  autoFocus?: boolean
  colorType?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

const PrimaryButton = ({ text, link, small }: primaryButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (link) {
      router.push(link)
    }
  }

  return (
    <Button
      sx={{
        padding: `${small ? '10px 35px' : '10px 90px'}`,
        boxShadow: 'none',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        borderRadius: '8px',
      }}
      type={link ? 'button' : 'submit'}
      color='primary'
      variant='contained'
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}

export const FlexableButton = ({ text, small, colorType, autoFocus = false, height, ...props }: primaryButtonProps) => {
  return (
    <Button
      sx={{
        padding: `${small ? '10px 35px' : '10px 90px'}`,
        paddingY: `${height || undefined}`,
        boxShadow: 'none',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        borderRadius: '8px',
      }}
      color={colorType || 'primary'}
      variant='contained'
      autoFocus={autoFocus}
      {...props}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
