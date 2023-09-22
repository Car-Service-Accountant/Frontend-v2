import { Box, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect } from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { asyncFetchAllCars } from '@/features/redux/cars/reducer'
// import { useRouter } from 'next/router'
import { carTypes } from '@/features/redux/cars/types'

const CarsInService = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const cars = useSelector((state: RootState) =>
    state.cars.cars?.filter((car) => car.repairs.some((repair) => !repair.finished)),
  )
  const theme = useTheme()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  // const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user.companyId))
    }
  }, [user?.companyId])

  const columns: GridColDef<carTypes>[] = [
    { field: '_id', headerName: 'ID' },
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
      field: 'carMark',
      headerName: 'Марка на колата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'carModel',
      headerName: 'Модел на колата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'carNumber',
      headerName: 'Номер на колата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'carVIN',
      headerName: 'Вин на колата',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'buildDate',
      headerName: 'Година на производство',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
  ]

  // if (selecredRow) {
  //   return <Navigate to={`/cars/${selecredRow}`} />
  // }

  return (
    <Box p={2}>
      <Box
        height='75vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `solid 2px ${theme.palette.secondary.light} !important`,
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
        {cars && (
          <DataGrid
            rows={cars}
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
      {/* <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton> */}
    </Box>
  )
}

export default CarsInService
