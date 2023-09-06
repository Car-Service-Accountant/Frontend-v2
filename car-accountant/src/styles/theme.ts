import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    mobile: true
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      mobile: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#173475',
      light: '#8DC8FC',
    },
    background: {
      default: '#F3F8FF',
      paper: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
      light: '#A7A7A7',
    },
    error: {
      main: '#E30000',
    },
    success: {
      main: '#50BC1D',
    },
    info: {
      main: '#F4DB06',
    },
  },
  typography: {
    fontSize: 14,
    fontWeightBold: 600,
    fontFamily: 'Montserrat, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#F3F8FF',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#F3F8FF',
            height: '0.5rem',
            width: '0.5rem',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: '#173475',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#173475',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#173475',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#173475',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#173475',
          },
        },
        html: {
          WebkitFontSmoothing: 'auto',
          scrollBehavior: 'smooth',
        },
      },
    },
  },
})

export default theme
