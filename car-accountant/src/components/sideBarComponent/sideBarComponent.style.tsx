import { List, styled } from '@mui/material'

const PREFIX = 'side-bar'

export const classes = {
  button: `${PREFIX}-button`,
  iconLink: `${PREFIX}-iconLink`,
  divider: `${PREFIX}-divider`,
  collapse: `${PREFIX}-collapse`,
  shake: `${PREFIX}-shake`,
  icon: `${PREFIX}-icon`,
  menuIcon: `${PREFIX}-menuIcon`,
  active: `${PREFIX}-active`,
  wrapper: `${PREFIX}-wrapper`,
}

const RootList = styled(List)(({ theme }) => ({
  padding: 0,
  [`& .${classes.wrapper}`]: {
    '&:hover': {
      backgroundColor: 'transperant',
    },
  },
  [`& .${classes.iconLink}`]: {
    width: '100%',
    transition: 'all 0.3s',
    height: '50px',
  },
  [`& .${classes.icon}`]: {
    color: theme.palette.background.paper,
  },
  [`& .${classes.iconLink}:hover`]: {
    backgroundColor: 'rgb(255 255 255 / 22%)',
    paddingLeft: '25px',
  },
  [`& .${classes.active}`]: {
    backgroundColor: 'rgb(255 255 255 / 22%)',
  },
  [`& .${classes.divider}`]: {
    borderColor: '#fff',
    borderWidth: '1px',
    marginLeft: '25px',
    marginRight: '25px',
    marginTop: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  [`& .${classes.iconLink}:hover .${classes.icon}`]: {
    animation: `${classes.shake} 0.8s`,
  },

  [`@keyframes ${classes.shake}`]: {
    '0%': {
      transform: 'rotate(0)',
    },
    '50%': {
      transform: 'rotate(15deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
}))

export default RootList
