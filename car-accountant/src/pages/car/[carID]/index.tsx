import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { formatDate } from '@/utils/dataformat'
import { asyncFetchCar } from '@/features/redux/cars/reducer'
import { repairsTypes } from '@/features/redux/repairs/types'
import { asyncDeleteRepair } from '@/features/redux/repairs/reducer'
import { FlexableButton } from '@/components/PrimaryButton'
import { enqueueSnackbar } from 'notistack'

const CarDetails = () => {
  const theme = useTheme()
  const router = useRouter()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const _id = router.query.carID as string
  const companyId = useSelector((state: RootState) => state.auth.user?.companyId)
  const selectedCar = useSelector((state: RootState) => state.cars.currentCar)
  const repairs = useSelector((state: RootState) => state.cars.currentCar?.repairs)
  const [selectedId, setSelectedId] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [open, setOpen] = useState<boolean>(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [dataIsFetching, setDataIsFetching] = useState<boolean>(true) // Make this to prevent load lastly viewed car
  const handleRowClick = (params) => {
    if (params.field !== 'Action') {
      router.push(`/repair/${params.id}`)
    }
  }

  const handleDialogClick = () => {
    setOpen(!open)
  }

  const handleDeleteClick = () => {
    if (selectedId && selectedCar && companyId) {
      console.log('In delete session ')
      Promise.all([
        dispatch(asyncDeleteRepair({ ID: selectedId })),
        dispatch(asyncFetchCar({ _id: selectedCar?._id, companyId })),
      ])
        .then(() => {
          enqueueSnackbar('Успешно премаханте ремонта', { variant: 'success' })
          setOpen(!open)
        })
        .catch(() => {
          enqueueSnackbar('Нещо се обърка по време на  премахане на ремонта', { variant: 'error' })
        })
    }
  }

  const handleMenuOpen = (event) => {
    setSelectedId(event.currentTarget.dataset.id)
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setSelectedId(null)
    setMenuAnchorEl(null)
  }

  // const handleDeleteClick = async () => {
  //   dispatch(asyncDeleteRepair({ID: selectedId}))
  // }

  useEffect(() => {
    if (companyId) {
      const fetchData = async () => {
        await dispatch(asyncFetchCar({ _id, companyId }))
        setDataIsFetching(false)
      }
      fetchData()
    }
  }, [])

  const columns: GridColDef<repairsTypes>[] = [
    {
      field: '_id',
      headerName: 'ID',
    },

    {
      field: 'createDate',
      headerName: 'Дата',
      flex: 1,
      width: isMobile ? 150 : 0,
      valueGetter: (params) => formatDate(params.value),
    },

    {
      field: 'service',
      headerName: 'Ремонт',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'parts',
      headerName: 'Части',
      flex: 1,
      width: isMobile ? 150 : 0,
      valueGetter: (params) => params.value.map((part) => part.partName).join(', '),
    },
    {
      field: 'priceForLabor',
      headerName: 'Цена на ремонта',
      flex: 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'totalPrice',
      headerName: 'Профит',
      flex: 1,
      width: isMobile ? 150 : 0,
      valueGetter: (params) => {
        let total = params.row.priceForLabor
        params.row.parts.forEach((part) => {
          total += part.clientPrice - part.servicePrice
        })
        return total
      },
    },
    {
      field: 'paied',
      headerName: 'Платено',
      flex: 0,
      renderCell: (params) => (
        <>
          <div
            style={{
              color: params.row.paied ? 'green' : 'red',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <svg width='20' height='20'>
              <rect display='block' width='20' height='20' fill='transparent' />
              {params.row.paied ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  shapeRendering='geometricPrecision'
                  textRendering='geometricPrecision'
                  imageRendering='optimizeQuality'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  viewBox='0 0 512 467.36'
                >
                  <g fillRule='nonzero'>
                    <path
                      fill='#333'
                      d='M58.327 0h254.296c-11.984 13.787-22.844 27.299-32.641 40.444H58.327c-4.929 0-9.415 2.01-12.656 5.227a17.95 17.95 0 00-5.227 12.657v350.705c0 4.868 2.04 9.331 5.288 12.579 3.264 3.263 7.75 5.304 12.595 5.304h395.345c4.815 0 9.286-2.056 12.557-5.327 3.271-3.271 5.326-7.742 5.326-12.556V211.536A1199.255 1199.255 0 00512 194.294v214.739c0 15.995-6.611 30.592-17.173 41.154-10.562 10.562-25.159 17.173-41.155 17.173H58.327c-15.996 0-30.623-6.58-41.193-17.15C6.595 439.671 0 425.082 0 409.033V58.328C0 26.298 26.298 0 58.327 0z'
                    />
                    <path
                      fill='#01A601'
                      d='M137.419 167.477l62.691-.825a10.042 10.042 0 015.427 1.513c12.678 7.329 24.639 15.69 35.789 25.121a243.712 243.712 0 0122.484 21.681c21.972-34.811 48.576-70.325 76.509-103.639 34.552-41.2 71.358-79.245 104.09-108.6a10.045 10.045 0 016.718-2.567l48.071-.039c5.579 0 10.111 4.532 10.111 10.111 0 2.752-1.108 5.259-2.896 7.077-44.311 49.249-89.776 105.68-130.969 163.496-38.09 53.466-72.596 108.194-99.23 159.612-2.553 4.945-8.644 6.894-13.588 4.341a10.07 10.07 0 01-4.693-5.105c-14.582-31.196-32.052-59.924-52.916-85.679-20.887-25.778-45.244-48.645-73.567-68.087-4.593-3.134-5.777-9.423-2.644-14.016 2.002-2.935 5.296-4.479 8.613-4.395z'
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  shapeRendering='geometricPrecision'
                  textRendering='geometricPrecision'
                  imageRendering='optimizeQuality'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  viewBox='0 0 512 467.36'
                >
                  <g fillRule='nonzero'>
                    <path
                      fill='#333'
                      d='M58.328 0h281.808c-12.342 13.848-23.286 27.376-32.931 40.444H58.328c-4.93 0-9.416 2.01-12.656 5.227a17.946 17.946 0 00-5.228 12.657v350.705c0 4.869 2.041 9.331 5.289 12.58 3.263 3.263 7.749 5.303 12.595 5.303h395.345c4.822 0 9.293-2.055 12.564-5.326 3.271-3.271 5.319-7.735 5.319-12.557V173.301A949.318 949.318 0 00512 155.387v253.646c0 15.988-6.595 30.585-17.164 41.155-10.562 10.562-25.175 17.172-41.163 17.172H58.328c-15.996 0-30.624-6.58-41.194-17.149C6.596 439.672 0 425.082 0 409.033V58.328c0-16.012 6.565-30.57 17.112-41.132l.084-.084C27.758 6.565 42.332 0 58.328 0z'
                    />
                    <path
                      fill='#E60000'
                      d='M133.575 346.12c18.954-37.249 49.386-79.673 85.902-120.988-33.864-33.099-68.76-63.815-101.133-89.447-4.792-3.783-5.61-10.761-1.826-15.553a10.965 10.965 0 016.572-3.997c25.946-5.128 46.451-2.69 64.755 5.327 17.86 7.833 32.992 20.78 48.843 37.127 6.832 7.054 14.49 15.285 22.629 24.334a903.03 903.03 0 0118.495-17.845c57.166-53.589 121.141-99.314 177.703-120.56 5.732-2.156 12.136.733 14.291 6.465a11.11 11.11 0 01-2.889 12.098c-23.515 25.091-50.562 51.511-78.786 79.077-29.148 28.476-59.565 58.197-87.904 88.118a1859.92 1859.92 0 0119.779 24.127c26.099 32.404 49.929 64.319 62.668 85.496 3.141 5.251 1.43 12.068-3.821 15.209a11.03 11.03 0 01-7.482 1.421l-34.888-4.425a11.052 11.052 0 01-7.451-4.318c-19.359-25.663-41.614-51.793-65.305-77.303-25.518 29.569-47.513 58.87-62.73 86.895-2.063 3.798-6.037 5.9-10.088 5.777l-47.62-.932c-6.114-.092-10.99-5.136-10.898-11.25a11.256 11.256 0 011.184-4.853z'
                    />
                  </g>
                </svg>
              )}
            </svg>
          </div>
          <IconButton size='large' onClick={handleMenuOpen} data-id={params.row._id}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ]

  if (selectedCar === null || dataIsFetching) {
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

  return (
    <Box m='20px'>
      <Box
        m='5px 0 0 0'
        height='75vh'
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `solid 2px ${theme.palette.secondary.light}`,
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none !important',
          },
          '& .name-column--cell': {
            color: theme.palette.primary.light,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.background.paper,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.paper,
            borderTop: 'none',
          },
        }}
      >
        <Typography
          fontSize={22}
          fontWeight={theme.typography.fontWeightBold}
          style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '10px' }}
        >
          Всички ремонти по {selectedCar.carModel} с номер {selectedCar?.carNumber}
        </Typography>
        {repairs && (
          <DataGrid
            rows={repairs}
            getRowId={(repair) => repair._id}
            columns={columns}
            onCellDoubleClick={handleRowClick}
            disableRowSelectionOnClick
            getRowClassName={(params) => (params.row.paied ? 'paid' : 'unpaid')}
            style={{ outline: 'none', boxShadow: 'none' }}
            columnVisibilityModel={{
              _id: false,
            }}
          />
        )}
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleDialogClick}>
            <DeleteForeverOutlinedIcon fontSize='small' />
            <Typography variant='body1' ml={1}>
              Премахване
            </Typography>
          </MenuItem>
        </Menu>
        <Dialog open={open} onClose={handleDialogClick}>
          <DialogTitle color={theme.palette.secondary.main}>Сигурeн ли сте ?</DialogTitle>
          <DialogContent>
            <DialogContentText color={theme.palette.secondary.main}>
              {/* Сигурeн ли сте ,че искате да платите задълженията на {repair?.owner} с регистрационен номер{' '}
              {repair?.carNumber} на стойност {repair?.totalCost} лв. */}
              ssss
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlexableButton onClick={handleDialogClick} text='Отказване' />
            <FlexableButton onClick={handleDeleteClick} autoFocus text='Потвърждение' />
          </DialogActions>
        </Dialog>
        {/* <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton> */}
      </Box>
    </Box>
  )
}

export default CarDetails
