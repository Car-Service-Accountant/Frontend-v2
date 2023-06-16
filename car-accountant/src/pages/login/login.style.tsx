import { Box, styled } from '@mui/material';

const MAIN = 'main-login';
const LEFT = 'LEFT-login';
const RIGHT = 'RIGHT-login';

export const classesLeftSide = {
  // leftSide
  left: `${LEFT}-left`,
  right: `${LEFT}-right`,
  loginForm: `${LEFT}-loginForm`,
  loginField: `${LEFT}-loginField`,
  fieldLabel: `${LEFT}-fieldLabel`,
  dividerLogin: `${LEFT}-dividerLogin`,
  googleDemoButton: `${LEFT}-googleDemoButton`,
  joinText: `${LEFT}-joinText`,
  rootLeftSide: `${LEFT}-rootLeftSide`,
  // main
  // righSide
};

export const classesMain = {
  mainRoot: `${MAIN}-mainRoot`,
}

export const MainWrapper = styled(Box)(({ theme }) => ({
  [`& .${classesMain.mainRoot}`]: {
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
}))

const LeftSideWraper = styled(Box)(({ theme }) => ({
  [`& .${classesLeftSide.loginForm}`]: {
    margin: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  [`& .${classesLeftSide.loginField}`]: {
    gridColumn: 'span 4',
    marginLeft: theme.spacing(13),
    maxWidth: '-webkit-fill-available',
    marginRight: theme.spacing(13),
    marginBottom: theme.spacing(3),
    '& .MuiTextField-root': {
      background: 'white',
    }
  },
  [`& .${classesLeftSide.fieldLabel}`]: {
    gridColumn: 'span 4',
    marginLeft: theme.spacing(13),
    marginBottom: theme.spacing(1),
  }, [`& .${classesLeftSide.dividerLogin}`]: {
    marginRight: theme.spacing(23),
    marginLeft: theme.spacing(23),
  },
  [`& .${classesLeftSide.googleDemoButton}`]: {
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
  [`& .${classesLeftSide.joinText}`]: {
    padding: "10px 90px",
    boxShadow: "none",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    borderRadius: "8px",
  },
}));

export default LeftSideWraper;
