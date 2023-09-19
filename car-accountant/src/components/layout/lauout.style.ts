import { Box, styled } from '@mui/material'

const PREFIX = 'layout'

export const classes = {
  divider: `${PREFIX}-divider`,
}

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  [`& .${classes.divider}`]: {
    borderColor: '#fff',
    borderWidth: '1px',
    marginLeft: '16px',
    marginRight: '16px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
}))

export default Root
