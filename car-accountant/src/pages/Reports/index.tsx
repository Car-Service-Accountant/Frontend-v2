import { Box, Typography, useTheme, useMediaQuery, Divider, TextField, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { FlexableButton } from '@/components/PrimaryButton'
import dayjs, { Dayjs } from 'dayjs'
import findRepairsInDateRangeAndSort from '../../utils/repairs/findRepairsInRangeSortAndCalculate'
import calculateProfitAndCost from '../../utils/repairs/calculateCostAndProfit'
import { asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import ReportHeader, { ReportHeaderProps } from '@/components/ReportHeader'

// const URL = API_URL

const Cars = () => {
  const theme = useTheme()
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const cars = useSelector((state: RootState) => state.cars.cars)
  const [repairs, setRepairs] = useState<any[]>()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const [ReportHeaderProps, setReportHeaderProps] = useState<ReportHeaderProps>()
  const [startDate, setStartDate] = useState<Dayjs | string>(dayjs())
  const [lastDate, setLastDate] = useState<Dayjs | string>()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedSearchType, setSelectedSearchType] = useState<string>('Дневен')

  const handleButtonClick = (event) => {
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
    console.log(startDate)
    console.log(lastDate)
    if (cars && startDate && lastDate) {
      const filteredRepairs = findRepairsInDateRangeAndSort(cars, startDate, lastDate)
      console.log('filteredRepairs', filteredRepairs)
      setRepairs(filteredRepairs)
      setReportHeaderProps(calculateProfitAndCost(filteredRepairs))
    }

    // setReportHeaderProps(calculateProfitAndCost(filteredRepairs))
  }, [cars, startDate, lastDate])

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
    }
  }, [startDate, selectedSearchType])

  const columns: GridColDef<any>[] = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'carNumber',
      headerName: 'Номер на колата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'carMark',
      headerName: 'Марка',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'carModel',
      headerName: 'Модел',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'owner',
      headerName: 'Име на клиента',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'phoneNumber',
      headerName: 'Телефон на клиента',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },

    {
      field: 'pureProfit',
      headerName: 'Чиста печалба',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'createDate',
      headerName: 'Дата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'paied',
      headerName: 'Чиста печалба',
      flex: isMobile ? undefined : 0.6,
      width: isMobile ? 150 : 0,
      align: 'center',
      renderCell: (params) => {
        return params.value ? <DoneIcon color='success' /> : <ClearIcon color='error' />
      },
    },
  ]

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
      <ReportHeader
        countRepairs={ReportHeaderProps?.countRepairs}
        totalCost={ReportHeaderProps?.totalCost}
        profit={ReportHeaderProps?.profit}
        pureProfit={ReportHeaderProps?.pureProfit}
      />
      <Box
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `solid 2px ${theme.palette.secondary.light} !important`,
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .name-column--cell': {
            color: theme.palette.secondary.light,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: theme.palette.background.paper,
          },
          '& .MuiCheckbox-root': {
            color: `${theme.palette.primary.main} !important`,
          },
          '& .MuiDataGrid-row': {
            '&:hover': {
              backgroundColor: `${theme.palette.background.default} !important`,
            },
            display: 'flex',
            flexWrap: 'nowrap',
            minWidth: '270px!important',
          },
        }}
      >
        {repairs && (
          <DataGrid
            rows={repairs}
            getRowId={(employer) => employer._id}
            columns={columns}
            disableRowSelectionOnClick
            columnVisibilityModel={{
              _id: false,
            }}
            onCellDoubleClick={(params) => {
              if (params.field !== 'Action') {
                console.log('row id ? ', params.id)
              }
            }}
            style={{ outline: 'none', boxShadow: 'none' }}
            sx={{
              '.MuiDataGrid-columnHeader:focus': {
                outline: 'none !important',
              },
            }}
          />
        )}
      </Box>
    </Box>
  )
}
export default Cars
