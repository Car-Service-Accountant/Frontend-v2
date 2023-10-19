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
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import DoneIcon from '@mui/icons-material/Done'
import { useEffect } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()

  console.log('CurrentRepair ==>', currentRepair)

  useEffect(() => {
    if ((!currentRepair || currentRepair._id !== repairID) && repairID && companyId) {
      dispatch(asyncFetchSingleRepair({ companyId, repairID }))
    }
  }, [repairID])

  const columns: GridColDef<repairsTypes>[] = [
    {
      field: 'service',
      headerName: 'Вид ремонт',
      flex: 1,
      width: isMobile ? 150 : 0,
    },

    {
      field: 'parts',
      headerName: 'Части',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'servicePrice',
      headerName: 'Цени за сервиза',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'clientPrice',
      headerName: 'Цени за клиента',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'priceForLabor',
      headerName: 'Цени за труда',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
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

  const counter =
    currentRepair?.parts?.length > currentRepair?.service?.length
      ? currentRepair?.parts?.length
      : currentRepair?.service?.length

  const totalClientPrice = currentRepair?.parts.reduce((total, part) => {
    return total + part.clientPrice
  }, 0)

  const profit = currentRepair?.parts.reduce((profit, part) => {
    return (profit = part.clientPrice - part.servicePrice)
  }, 0)

  return (
    <Box m='20px'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#8DC8FC' }}>
              {columns.map((column: any) => (
                <TableCell key={column._id} id={column._id}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{currentRepair?.service[0]}</TableCell>
              <TableCell>{currentRepair?.parts[0].partName}</TableCell>
              <TableCell>{currentRepair?.parts[0].servicePrice}лв</TableCell>
              <TableCell>{currentRepair?.parts[0].clientPrice}лв</TableCell>
              <TableCell>{currentRepair?.priceForLabor}лв</TableCell>
            </TableRow>
            {Array.from({ length: counter - 1 }).map((_, index) => (
              <TableRow key={index + 1}>
                <TableCell>{currentRepair?.service[index + 1]}</TableCell>
                <TableCell>{currentRepair?.parts[index + 1].partName}</TableCell>
                <TableCell>{currentRepair?.parts[index + 1].servicePrice}лв</TableCell>
                <TableCell>{currentRepair?.parts[index + 1].clientPrice}лв</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow style={{ backgroundColor: '#8DC8FC' }}>
              <TableCell>Цена на ремонта</TableCell>
              <TableCell>Чиста печалба</TableCell>
              <TableCell>Взета кола</TableCell>
              <TableCell>Платено</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>{currentRepair?.priceForLabor + totalClientPrice}лв</TableCell>
            <TableCell>{profit + currentRepair?.priceForLabor}лв</TableCell>
            <TableCell style={{ color: currentRepair?.finished ? 'green' : 'red' }}>
              {currentRepair?.finished ? <DoneIcon /> : <ClearIcon />}
            </TableCell>
            <TableCell style={{ color: currentRepair?.paied ? 'green' : 'red' }}>
              {currentRepair?.paied ? <DoneIcon /> : <ClearIcon />}
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton> */}
    </Box>
  )
}

export default RepairDetail
