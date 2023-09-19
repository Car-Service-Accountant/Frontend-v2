import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

interface primaryButtonProps {
  text: string
  link?: string
  small?: boolean
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

export default PrimaryButton
