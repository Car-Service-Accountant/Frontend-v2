import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { carTypes } from '@/features/redux/cars/types'
import { repairsTypes } from '@/features/redux/repairs/types'
import { formatDate } from '@/utils/dataformat'
import { FlexableButton } from '@/components/PrimaryButton'
import { asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { asyncFetchCashBox, asyncUpdateCashBox } from '@/features/redux/cashBox/reducer'
import { asyncPayRepair } from '@/features/redux/repairs/reducer'
import { enqueueSnackbar } from 'notistack'

type PaymentDataProps = {
  repairId: string
  carId: string
  owner: string
  carNumber: string
  phoneNumber: string
  carModel: string
  carMark: string
  buildDate: string
  priceForLabor: number
  costForParts: number
  totalCost: number
}

const AwaitingPayments = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const cars = useSelector((state: RootState) => state.cars.cars)
  const cashBox = useSelector((state: RootState) => state.cashBox.cashBox)
  const cashBoxState = useSelector((state: RootState) => state.cashBox)
  const repairState = useSelector((state: RootState) => state.repairs)
  const [open, setOpen] = useState<boolean>(false)
  const [repair, setRepair] = useState<PaymentDataProps | null>(null)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()

  // const { addTotalAmount, cashBox } = useCashBox()
  const theme = useTheme()
  const [filteredRepairs, setFilteredRepairs] = useState<{ car: carTypes; repair: repairsTypes; totalCost: number }[]>(
    [],
  )

  const handleDialogAction = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user?.companyId))
    }
    if (user?.cashBoxID) {
      dispatch(asyncFetchCashBox(user.cashBoxID))
    }
  }, [user?.companyId])

  useEffect(() => {
    if (cars) {
      const allRepairs: { car: carTypes; repair: repairsTypes; totalCost: number }[] = []
      const unfinishedCars = cars.filter((car) => car.repairs.some((repair) => !repair.finished))
      unfinishedCars.forEach((car) => {
        car.repairs.forEach((repair) => {
          if (!repair.paied) {
            let priceForLabor = 0
            let costForParts = 0
            priceForLabor += repair.priceForLabor
            repair.parts.forEach((part) => {
              costForParts += part.servicePrice
            })
            allRepairs.push({
              car,
              repair,
              totalCost: priceForLabor + costForParts,
            })
          }
        })
      })
      setFilteredRepairs(allRepairs)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars])

  const rows = filteredRepairs.map((repairObj) => {
    const { car, repair } = repairObj
    return {
      repairId: repair._id,
      carId: car._id,
      owner: car.owner,
      carNumber: car.carNumber,
      phoneNumber: car.phoneNumber,
      carModel: car.carModel,
      carMark: car.carMark,
      buildDate: formatDate(car.buildDate),
      priceForLabor: repair.priceForLabor,
      costForParts: repair.parts.reduce((sum, part) => sum + part.servicePrice, 0),
      totalCost: repair.priceForLabor + repair.parts.reduce((sum, part) => sum + part.clientPrice, 0),
    }
  })

  const handlePayment = async () => {
    if (cashBox && repair?.totalCost && user?.cashBoxID) {
      let { cost, totalAmount } = cashBox

      const data = {
        additionalCosts: cashBox.additionalCosts,
        cost: (cost += repair.costForParts),
        employersSellary: cashBox.employersSellary,
        profit: totalAmount - cost - cashBox.employersSellary - cashBox.additionalCosts,
        totalAmount: (totalAmount += repair.totalCost),
        totalForMonth: cashBox.totalForMonth,
      }
      dispatch(asyncUpdateCashBox({ cashboxID: user?.cashBoxID, data }))
    }
    const updatedRepairs = {
      paied: false,
      finished: false,
      endDate: Date.now(),
    }
    if (!cashBoxState.isRejected && cashBoxState.upToDate) {
      updatedRepairs.paied = true
      updatedRepairs.finished = true
      updatedRepairs.endDate = Date.now()
      dispatch(asyncPayRepair({ repID: repair?.repairId as string, data: updatedRepairs }))
    }

    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user?.companyId))
    }
    if (!cashBoxState.isRejected && !repairState.isRejected && repair) {
      enqueueSnackbar('Успещно палщане', { variant: 'success' })
      setFilteredRepairs(filteredRepairs.filter((currentRepair) => currentRepair.repair._id !== repair?.repairId))
      setOpen(!open)
    } else {
      enqueueSnackbar('Неуспешно плащане', { variant: 'error' })
    }
    setOpen(!open)
  }

  const columns: GridColDef<PaymentDataProps>[] = [
    { field: 'repairId', headerName: 'ID' },
    { field: 'carId', headerName: 'CarID' },
    {
      field: 'owner',
      headerName: 'Име на клиента',
      width: 150,
    },
    {
      field: 'phoneNumber',
      headerName: 'Телефон на клиента',
      width: 150,
    },
    {
      field: 'carMark',
      headerName: 'Марка на колата',
      width: 150,
    },
    {
      field: 'carModel',
      headerName: 'Модел на колата',
      width: 150,
    },
    {
      field: 'carNumber',
      headerName: 'Номер на колата',
      width: 110,
    },
    {
      field: 'carVIN',
      headerName: 'Вин на колата',
      width: 150,
    },
    {
      field: 'buildDate',
      headerName: 'Година на производство',
      width: 110,
    },
    {
      field: 'totalCost',
      headerName: 'Всичко дължимо',
      width: 110,
      valueGetter: (params) => `${params.value} лв.`,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <FlexableButton
          height='4px'
          colorType='success'
          small
          onClick={() => {
            setRepair(params.row)
            handleDialogAction()
          }}
          text='Плати'
        />
      ),
    },
  ]
  return (
    <Box p={2}>
      <Box
        height='75vh'
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `solid 2px ${theme.palette.secondary.light} !important`,
          },
          '& .MuiDataGrid-columnHeader': {},
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
          '& .MuiDataGrid-cell:focus': {
            outline: 'none !important',
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
        <Typography
          fontSize={22}
          fontWeight={theme.typography.fontWeightBold}
          style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '10px' }}
        >
          Чакащи плащания
        </Typography>
        <DataGrid
          rows={rows}
          getRowId={(row) => row?.repairId}
          columns={columns}
          disableRowSelectionOnClick
          columnVisibilityModel={{
            repairId: false,
            carId: false,
          }}
          style={{ outline: 'none', boxShadow: 'none' }}
          sx={{
            '.MuiDataGrid-columnHeader:focus': {
              outline: 'none !important',
            },
          }}
        />
        <Dialog open={open} onClose={handleDialogAction}>
          <DialogTitle color={theme.palette.secondary.main}>Сигурeн ли сте ?</DialogTitle>
          <DialogContent>
            <DialogContentText color={theme.palette.secondary.main}>
              Сигурeн ли сте ,че искате да платите задълженията на {repair?.owner} с регистрационен номер{' '}
              {repair?.carNumber} на стойност {repair?.totalCost} лв.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <FlexableButton onClick={handleDialogAction} text='Отказване' />
            <FlexableButton onClick={handlePayment} autoFocus text='Потвърждение' />
          </DialogActions>
        </Dialog>
      </Box>
      {/* <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton> */}
    </Box>
  )
}

export default AwaitingPayments
