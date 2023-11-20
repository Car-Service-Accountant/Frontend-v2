import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface primaryButtonProps {
  text: string
  event?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'submit' | 'button'
  small?: boolean
  height?: string
  link?: string
  autoFocus?: boolean
  colorType?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  margin?: string | undefined
  children?: React.ReactNode
  // eslint-disable-next-line no-unused-vars
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
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

export const FlexableButton = ({
  text,
  small,
  type = 'button',
  colorType,
  autoFocus = false,
  height,
  margin,
  children,
  ...props
}: primaryButtonProps) => {
  return (
    <Button
      sx={{
        padding: `${small ? '10px 35px' : '10px 60px'}`,
        paddingY: `${height || undefined}`,
        margin: margin || undefined,
        boxShadow: 'none',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '18px',
        borderRadius: '8px',
      }}
      color={colorType || 'primary'}
      variant='contained'
      autoFocus={autoFocus}
      type={type}
      {...props}
    >
      {text}
      {children}
    </Button>
  )
}

export default PrimaryButton
