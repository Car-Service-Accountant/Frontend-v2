import { RootState } from '@/features/redux/store'
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import { GuestAccesedPaths, ManagerAccesedPaths, OwnerAccesedPaths } from '../sideBarComponent'
import RootBox, { classes } from './lauout.style'
import { useRouter } from 'next/router'
import { logOut } from '@/features/redux/auth/reducer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

const drawerWidth = 240

interface Props {
  children: React.ReactNode
}

const ResponsiveDrawer: React.FC<Props> = ({ children }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const username = useSelector((state: RootState) => state.auth.user?.username)
  const user = useSelector((state: RootState) => state.auth.user)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    localStorage.clear()
    // TODO: reforge backend to handle this request and set current token to blacklist , soo noone can join again with this token
    await dispatch(logOut())
    router.push('/login')
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const appBar = (
    <AppBar
      position='fixed'
      sx={{
        width: '100%',
        zIndex: 4,
        backgroundColor: 'background.paper',
      }}
    >
      <Toolbar>
        <IconButton
          color='primary'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        {!isMobile && (
          <>
            <Typography variant='h6' component='div' color={'black'}>
              AutologBG
            </Typography>
            <Image src={'/../public/pics/demo-logo.png'} width={110} height={60} alt='Missing logo' />
          </>
        )}
        <Typography style={{ marginLeft: '5vw' }} variant='h6' color={theme.palette.text.primary} fontSize={16}>
          Приятна работа, <b>{username}</b>
        </Typography>

        <IconButton color='primary' onClick={handleMenuClick} sx={{ ml: 'auto' }}>
          <Avatar sx={{ width: 32, height: 32, backgroundColor: theme.palette.primary.main }}>
            {username?.[0].toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 2,
            sx: {
              '.MuiDivider-root': {
                margin: '0 !important',
              },
              overflow: 'visible',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
              '.MuiMenuItem-root:hover': {
                backgroundColor: theme.palette.background.default,
              },
              '.MuiMenu-list': {
                padding: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
            }}
            onClick={() => router.push('/profile')}
          >
            <Avatar sx={{ width: 55, height: 55, marginRight: 2, backgroundColor: theme.palette.primary.main }}>
              {username?.[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography fontWeight='600'>{user?.username}</Typography>
              <Typography fontSize='10px'>{user?.email}</Typography>
            </Box>
          </MenuItem>
          <Divider sx={{ margin: 0 }} />
          <MenuItem
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
            }}
            onClick={() => router.push('/profile')}
          >
            {/* <SettingsIcon fontSize='large' style={{ marginRight: '5px', marginLeft: '-3px' }} /> */}
            <Typography fontWeight='600' fontSize={12}>
              Настройки на профила
            </Typography>
          </MenuItem>
          <Divider sx={{ margin: 0 }} />
          <MenuItem
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
            }}
            onClick={() => router.push('/help')}
          >
            {/* <SettingsIcon fontSize='large' style={{ marginRight: '5px', marginLeft: '-3px' }} /> */}
            <Typography fontWeight='600' fontSize={12}>
              Помощ
            </Typography>
          </MenuItem>
          <Divider sx={{ margin: 0 }} />
          <MenuItem
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '15px',
            }}
            onClick={handleLogout}
          >
            {/* <LogoutIcon fontSize='large' style={{ marginRight: '5px' }} /> */}
            <Typography fontWeight='600' fontSize={12}>
              Изход
            </Typography>
          </MenuItem>
          {/* Add more MenuItem components for additional options */}
        </Menu>
      </Toolbar>
    </AppBar>
  )

  const drawer = (
    <>
      <Toolbar />
      <GuestAccesedPaths />
      <Divider className={classes.divider} />
      <ManagerAccesedPaths />
      <Divider className={classes.divider} />
      <OwnerAccesedPaths />
    </>
  )

  return (
    <RootBox>
      <CssBaseline />
      {appBar}
      <Box component='nav' sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: 'primary.main',
              boxSizing: 'border-box',
              width: drawerWidth,
              zIndex: 1,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              backgroundColor: 'primary.main',
              boxSizing: 'border-box',
              width: drawerWidth,
              zIndex: 1,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </RootBox>
  )
}

export default ResponsiveDrawer
