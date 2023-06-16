import { createTheme } from '@mui/material';

const theme = createTheme({
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
    fontSize: 18,
    fontFamily: '-moz-initial monoserat',
  },
});

export default theme;
