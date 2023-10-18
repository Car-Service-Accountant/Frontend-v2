import { Box, Typography, useTheme, useMediaQuery, Divider, TextField, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { FlexableButton } from '@/components/PrimaryButton'
import dayjs, { Dayjs } from 'dayjs'

// const URL = API_URL

const Cars = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const [startDate, setStartDate] = useState<Dayjs | string>(dayjs())
  const [lastDate, setLastDate] = useState<Dayjs | string>()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSearchType, setSelectedSearchType] = useState<string>()

  const handleButtonClick = (event) => {
    console.log('open? ')

    setAnchorEl(event.currentTarget)
  }
  const handleMenuItemClick = (item) => {
    setSelectedSearchType(item)
    setAnchorEl(null)
  }

  const handleChangeStratDate = (event: any) => {
    if (event.target.value) {
      setStartDate(event.target.value)
    }
  }
  const handleChangeLastDate = (event: any) => {
    if (event.target.value) {
      setLastDate(event.target.value)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user?.companyId))
    }
  }, [user?.companyId])

  useEffect(() => {
    startDate && setStartDate(startDate)
    lastDate && setLastDate(lastDate)
    if (selectedSearchType) {
      if (selectedSearchType === 'Дневен') {
        setLastDate(dayjs(startDate).add(1, 'day'))
      }
      if (selectedSearchType === 'Седмичен') {
        setLastDate(dayjs(startDate).add(1, 'week'))
      }
      if (selectedSearchType === 'Месечен') {
        setLastDate(dayjs(startDate).add(1, 'month'))
      }
      if (selectedSearchType === 'По избор') {
        setLastDate(dayjs(startDate).add(3, 'day'))
      }
    }
  }, [startDate, selectedSearchType, lastDate])

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      minHeight='87vh'
      sx={{
        borderRadius: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          flexWrap: 'wrap',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
          },
        }}
      >
        <Typography
          fontWeight={600}
          sx={{
            padding: theme.spacing(3),
          }}
          fontSize={22}
        >
          Отчети
        </Typography>
        <Box
          sx={{
            paddingRight: theme.spacing(2),
            paddingBottom: isSmall ? theme.spacing(2) : undefined,
          }}
        >
          <FlexableButton small={isMobile} text='Изтегли PDF' margin='0px 14px 0 0' />
          <FlexableButton small={isMobile} text={selectedSearchType || 'Сортирай по'} onClick={handleButtonClick} />
          <Menu
            sx={{
              ['.MuiMenu-list']: {
                minWidth: `${isMobile ? '190px' : '240px'}`,
              },
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleMenuItemClick('Дневен')}>Дневен</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Седмичен')}>Седмичен</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('Месечен')}>Месечен</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('По избор')}>По избор</MenuItem>
          </Menu>
        </Box>
      </Box>
      <Divider sx={{ border: 'solid 1px #173475' }} />
      <Box
        sx={{
          fontWeight: 600,
          padding: theme.spacing(3),
        }}
      >
        <Typography paddingBottom={theme.spacing(2)} fontSize={16}>
          Стартова дата на отчета
        </Typography>
        <Box
          display='grid'
          gap='30px'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          sx={{
            '& > div': { gridColumn: isSmall ? 'span 4' : undefined },
          }}
        >
          {/* TODO: use dayjs lib for this , its better and easyer i guess */}
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            type='date'
            variant='outlined'
            label='Начална дата'
            onChange={handleChangeStratDate}
            value={dayjs(startDate).format('YYYY-MM-DD')}
            name='startDate'
            sx={{ gridColumn: 'span 2' }}
          />
          {selectedSearchType === 'По избор' && (
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              type='date'
              variant='outlined'
              label='Крайна дата'
              onChange={handleChangeLastDate}
              value={dayjs(lastDate).format('YYYY-MM-DD')}
              name='lastDate'
              sx={{ gridColumn: 'span 2' }}
            />
          )}
        </Box>
      </Box>
      {startDate && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Typography fontSize={24} fontWeight={600}>
            {dayjs(startDate).format('YYYY-MM-DD') as string}/{dayjs(lastDate).format('YYYY-MM-DD') as string}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
export default Cars
