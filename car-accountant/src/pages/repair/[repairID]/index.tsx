import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { asyncFetchSingleRepair } from '@/features/redux/repairs/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { GridColDef } from '@mui/x-data-grid'
import { repairsTypes } from '@/features/redux/repairs/types'

const RepairDetail = () => {
  const router = useRouter()
  const repairID: string = router.query.repairID as string
  const currentRepair = useSelector((state: RootState) => state.repairs.currentRepair)
  const companyId = useSelector((state: RootState) => state.auth.user?.companyId)
  const selectedCar = useSelector((state: RootState) => state.cars.currentCar)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()

  useEffect(() => {
    if ((!currentRepair || currentRepair._id !== repairID) && repairID && companyId) {
      dispatch(asyncFetchSingleRepair({ companyId, repairID }))
    }
  }, [repairID, currentRepair, companyId, dispatch])

  const columns: GridColDef<repairsTypes>[] = [
    { field: 'service', headerName: 'Вид ремонт', flex: 1, width: isMobile ? 150 : 0 },
    { field: 'parts', headerName: 'Части', flex: 1, width: isMobile ? 150 : 0 },
    { field: 'servicePrice', headerName: 'Цени за сервиза', flex: 1, width: isMobile ? 150 : 0 },
    { field: 'clientPrice', headerName: 'Цени за клиента', flex: 1, width: isMobile ? 150 : 0 },
    { field: 'priceForLabor', headerName: 'Цени за труда', flex: 1, width: isMobile ? 150 : 0 },
  ]

  if (!currentRepair) {
    return (
      <CircularProgress
        style={{
          color: '#6870fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          height: '80vh',
        }}
      />
    )
  }

  const counter = Math.max(currentRepair.parts?.length || 0, currentRepair.service?.length || 0)

  const totalClientPrice =
    currentRepair.parts?.reduce((total, part) => {
      return total + (part.clientPrice ?? 0)
    }, 0) ?? 0

  const profit =
    currentRepair.parts?.reduce((acc, part) => {
      return acc + ((part.clientPrice ?? 0) - (part.servicePrice ?? 0))
    }, 0) ?? 0

  const totalRepairPrice = (currentRepair.priceForLabor ?? 0) + totalClientPrice
  const totalProfit = profit + (currentRepair.priceForLabor ?? 0)

  return (
    <Box m='20px' sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '8px' }}>
      <Typography
        fontSize={22}
        fontWeight={theme.typography.fontWeightBold}
        style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '10px' }}
      >
        Детайли за ремонта по {selectedCar?.carModel} с номер {selectedCar?.carNumber}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='repair-details'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#8DC8FC' }}>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: counter }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>{currentRepair.service?.[index] ?? ''}</TableCell>
                <TableCell>{currentRepair.parts?.[index]?.partName ?? ''}</TableCell>
                <TableCell>
                  {typeof currentRepair.parts?.[index]?.servicePrice === 'number'
                    ? `${currentRepair.parts[index].servicePrice.toFixed(2)}лв`
                    : ''}
                </TableCell>
                <TableCell>
                  {typeof currentRepair.parts?.[index]?.clientPrice === 'number'
                    ? `${currentRepair.parts[index].clientPrice.toFixed(2)}лв`
                    : ''}
                </TableCell>
                <TableCell>
                  {index === 0 && typeof currentRepair.priceForLabor === 'number'
                    ? `${currentRepair.priceForLabor.toFixed(2)}лв`
                    : index === 0
                    ? '0.00лв'
                    : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label='summary-table'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#8DC8FC' }}>
              <TableCell>Цена на ремонта</TableCell>
              <TableCell>Чиста печалба</TableCell>
              <TableCell>Взета кола</TableCell>
              <TableCell>Платено</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{totalRepairPrice.toFixed(2)}лв</TableCell>
              <TableCell>{totalProfit.toFixed(2)}лв</TableCell>
              <TableCell style={{ color: currentRepair.finished ? 'green' : 'red' }}>
                {currentRepair.finished ? <DoneIcon /> : <ClearIcon />}
              </TableCell>
              <TableCell style={{ color: currentRepair.paied ? 'green' : 'red' }}>
                {currentRepair.paied ? <DoneIcon /> : <ClearIcon />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RepairDetail
