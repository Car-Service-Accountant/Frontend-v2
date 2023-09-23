import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const MAIN = 'main-login'
const LEFT = 'LEFT-login'
const RIGHT = 'RIGHT-login'

export const classesRightSide = {
  left: `${RIGHT}-left`,
  right: `${RIGHT}-right`,
  loginForm: `${RIGHT}-loginForm`,
  loginField: `${RIGHT}-loginField`,
  fieldLabel: `${RIGHT}-fieldLabel`,
  dividerLogin: `${RIGHT}-dividerLogin`,
  googleDemoButton: `${RIGHT}-googleDemoButton`,
  joinText: `${RIGHT}-joinText`,
  rootLeftSide: `${RIGHT}-rootLeftSide`,
}

export const classesMain = {
  mainRoot: `${MAIN}-mainRoot`,
}

export const classesLeftSide = {
  mainText: `${LEFT}-mainText`,
  img: `${LEFT}-img`,
  slider: `${LEFT}-slider`,
  sliderBox: `${LEFT}-sliderBox`,
}

export const LeftSideWraper = styled(Box)(({ theme }) => ({
  [`& .${classesLeftSide.mainText}`]: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(14),
  },
  [`& .${classesLeftSide.img}`]: {
    marginTop: theme.spacing(11),
  },
  [`& .${classesLeftSide.sliderBox}`]: {
    marginTop: theme.spacing(4),
  },
  [`& .${classesLeftSide.slider}`]: {
    '& .slick-slider': {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      '& .slick-dots': {
        width: 'auto',
        '& .slick-active button': {
          background: 'white',
        },
        '& button': {
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          border: '2px solid white',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        },
        '& button:before': {
          content: '""',
          width: '5px',
          height: '5px',
          display: 'block',
          margin: '4px',
          borderRadius: '50%',
          background: 'transperant',
          transition: 'background-color 0.3s',
        },
      },
    },
  },
}))

export const MainWrapper = styled(Box)(({ theme }) => ({
  [`& .${classesMain.mainRoot}`]: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
}))

const RightSideWraper = styled(Box)(({ theme }) => ({
  [`& .${classesRightSide.loginForm}`]: {
    margin: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  [`& .${classesRightSide.loginField}`]: {
    gridColumn: 'span 4',
    marginLeft: theme.spacing(13),
    maxWidth: '-webkit-fill-available',
    marginRight: theme.spacing(13),
    marginBottom: theme.spacing(3),
    '& .MuiTextField-root': {
      background: 'white',
    },
  },
  [`& .${classesRightSide.fieldLabel}`]: {
    gridColumn: 'span 4',
    marginLeft: theme.spacing(13),
    marginBottom: theme.spacing(1),
  },
  [`& .${classesRightSide.dividerLogin}`]: {
    marginRight: theme.spacing(23),
    marginLeft: theme.spacing(23),
  },
  [`& .${classesRightSide.googleDemoButton}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '40px',
    borderRadius: theme.spacing(1),
    backgroundColor: 'wihte',
    color: theme.palette.secondary.dark,
    border: `1px solid ${theme.palette.primary.main}`,
    cursor: 'pointer',
    marginBottom: theme.spacing(3),
  },
  [`& .${classesRightSide.joinText}`]: {
    padding: '10px 90px',
    boxShadow: 'none',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    borderRadius: '8px',
  },
}))

export default RightSideWraper
