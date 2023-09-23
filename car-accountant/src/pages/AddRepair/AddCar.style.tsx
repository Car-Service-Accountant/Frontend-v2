import { Box, styled } from '@mui/material'

const PREFIX = 'add-car'

export const classes = {
  divider: `${PREFIX}-divider`,
  wrapper: `${PREFIX}-wrapper`,
  disabledTextfield: `${PREFIX}-disabledTextfield`,
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(1),
  margin: theme.spacing(2),
  boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
  minHeight: '84vh',
  [`& .${classes.divider}`]: {
    border: 'solid 1px #173475',
  },
  [`& .${classes.wrapper}`]: {
    backgroundColor: '#fff',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
    width: '100%',
  },
  [`& .${classes.disabledTextfield}`]: {
    '& .MuiInputBase-input.Mui-disabled': {
      WebkitTextFillColor: '#000000',
    },
  },
}))

export default StyledBox
