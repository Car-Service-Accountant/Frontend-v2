import { RootState } from '@/features/redux/store'
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import { GuestAccesedPaths, ManagerAccesedPaths, OwnerAccesedPaths } from '../sideBarComponent'
import RootBox, { classes } from './lauout.style'

const drawerWidth = 240

interface Props {
  children: React.ReactNode
}

const ResponsiveDrawer: React.FC<Props> = ({ children }) => {
  const theme = useTheme()
  const username = useSelector((state: RootState) => state.auth.user?.username)
  const [mobileOpen, setMobileOpen] = useState(false)

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
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' component='div' color={'black'}>
          AutologBG
        </Typography>
        <Image src={'/../public/pics/demo-logo.png'} width={110} height={60} alt='Missing logo' />
        <Typography style={{ marginLeft: '5vw' }} variant='h6' color={theme.palette.text.primary} fontSize={16}>
          Приятна работа, <b>{username}</b>
        </Typography>
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
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
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
            display: { xs: 'none', sm: 'block' },
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
          width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </RootBox>
  )
}

export default ResponsiveDrawer
