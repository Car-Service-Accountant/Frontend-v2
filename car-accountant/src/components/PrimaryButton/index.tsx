import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const PrimaryButton = ({ text, link }: { text: string; link?: string }) => {
  const router = useRouter()

  const handleClick = () => {
    if (link) {
      router.push(link)
    }
  }

  return (
    <Button
      sx={{
        padding: '10px 90px',
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
