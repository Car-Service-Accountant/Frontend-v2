import { Box, ListItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { guestItems, managerItems, ownerItems } from '@/constants/sidebarItems'
import RootList, { classes } from './sideBarComponent.style'
import Link from 'next/link'

export const GuestAccesedPaths = () => {
  const router = useRouter()
  const path = router.asPath

  return (
    <RootList>
      {guestItems.map((item, index) => (
        <ListItem key={index} className={`${classes.iconLink} ${path === item.path ? classes.active : ''}`}>
          <Link style={{ textDecoration: 'none' }} href={item.path}>
            <Box display='flex'>
              <Box className={classes.icon}>{item.icon}</Box>
              <Typography color='background.paper' className={classes.button}>
                {item.label}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </RootList>
  )
}

export const ManagerAccesedPaths = () => {
  const router = useRouter()
  const path = router.asPath

  return (
    <RootList>
      {managerItems.map((item, index) => (
        <ListItem key={index} className={`${classes.iconLink} ${path === item.path ? classes.active : ''}`}>
          <Link style={{ textDecoration: 'none' }} href={item.path}>
            <Box display='flex'>
              <Box className={classes.icon}>{item.icon}</Box>
              <Typography color='background.paper' className={classes.button}>
                {item.label}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </RootList>
  )
}

export const OwnerAccesedPaths = () => {
  const router = useRouter()
  const path = router.asPath

  return (
    <RootList>
      {ownerItems.map((item, index) => (
        <ListItem key={index} className={`${classes.iconLink} ${path === item.path ? classes.active : ''}`}>
          <Link style={{ textDecoration: 'none' }} href={item.path}>
            <Box display='flex'>
              <Box className={classes.icon}>{item.icon}</Box>
              <Typography color='background.paper' className={classes.button}>
                {item.label}
              </Typography>
            </Box>
          </Link>
        </ListItem>
      ))}
    </RootList>
  )
}
