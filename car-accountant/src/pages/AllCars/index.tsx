import {
  Box,
  IconButton,
  Menu,
  Typography,
  useTheme,
  MenuItem,
  useMediaQuery,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useEffect, useState } from 'react'
import { carTypes } from '@/features/redux/cars/types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { asyncDeleteCar, asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useRouter } from 'next/router'
import { formatDate } from '@/utils/dataformat'
import { enqueueSnackbar } from 'notistack'
import { FlexableButton } from '@/components/PrimaryButton'
import EditCarModal from '@/components/EditCarModal/EditCarModal'

const Cars = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const data = useSelector((state: RootState) => state.cars)
  const user = useSelector((state: RootState) => state.auth.user)

  const router = useRouter()

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCar, setSelectedCar] = useState<carTypes | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllCars(user.companyId))
    }
  }, [user?.companyId])

  const handleRowClick = (params: any) => {
    if (params.field !== 'Действия') {
      router.push(`/car/${params.id}`, undefined, { shallow: true })
    }
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const carId = event.currentTarget.dataset.id
    const foundCar = data?.cars?.find((car) => car._id === carId) || null
    setSelectedCar(foundCar)
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setSelectedCar(null)
    setMenuAnchorEl(null)
  }

  const handleEditClick = () => {
    setOpenEditModal(true)
  }

  // const handleEditClick = () => {
  //   if (selectedCar?._id) {
  //     router.push(`/car/edit/${selectedCar._id}`)
  //     handleMenuClose()
  //   }
  // }

  const handleDeleteClick = async () => {
    if (selectedCar) {
      enqueueSnackbar(`Успешно премахнахте ${selectedCar.carMark} с регистрационен номер ${selectedCar.carNumber}`, {
        variant: 'success',
      })
      setOpen(false)
      handleMenuClose()
      dispatch(asyncDeleteCar(selectedCar._id))
    }
  }

  const columns: GridColDef<carTypes>[] = [
    {
      field: '_id',
      headerName: 'ID',
      hideable: true,
    },
    {
      field: 'owner',
      headerName: 'Собственик',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
    },
    {
      field: 'buildDate',
      headerName: 'Дата на производство',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: 'carMark',
      headerName: 'Марка на колата ',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
    },
    {
      field: 'carModel',
      headerName: 'Модел на колата',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
    },
    {
      field: 'carNumber',
      headerName: 'Номер на колата',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
    },
    {
      field: 'carVIN',
      headerName: 'Вин на колата',
      flex: 1,
      minWidth: isMobile ? 150 : 0,
    },
    {
      field: 'Действия',
      headerName: '',
      sortable: false,
      width: 0,
      renderCell: (params) => (
        <IconButton sx={{ padding: 1 }} size='large' onClick={handleMenuOpen} data-id={params.row._id}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  if (data?.cars === null && data?.isDoneLoading) {
    return (
      <Typography variant='h1' sx={{ display: 'flex', justifyContent: 'center', mt: 12 }}>
        Все още няма създадени коли
      </Typography>
    )
  }

  if (!data?.isDoneLoading) return <LinearProgress color='primary' />

  return (
    <Box p={2}>
      <Box
        height='75vh'
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '8px',
          boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: `solid 2px ${theme.palette.secondary.light}` },
          '& .MuiDataGrid-cell:focus': { outline: 'none !important' },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: theme.palette.primary.light },
          '& .MuiDataGrid-virtualScroller': { backgroundColor: theme.palette.background.paper },
          '& .MuiDataGrid-footerContainer': { backgroundColor: theme.palette.background.paper, borderTop: 'none' },
          '& .MuiDataGrid-row': {
            '&:hover': { backgroundColor: `${theme.palette.background.default} !important` },
            display: 'flex',
            flexWrap: 'nowrap',
            minWidth: '270px!important',
          },
        }}
      >
        <Typography fontSize={22} fontWeight={theme.typography.fontWeightBold} sx={{ pl: 3, pt: 2.5, pb: 1 }}>
          Всички коли
        </Typography>
        <DataGrid
          rows={data?.cars || []}
          getRowId={(row) => row._id}
          columns={columns}
          disableRowSelectionOnClick
          onCellDoubleClick={handleRowClick}
          columnVisibilityModel={{ _id: false }}
          sx={{ '.MuiDataGrid-columnHeader:focus': { outline: 'none !important' } }}
        />
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEditClick}>
            <ModeEditOutlineOutlinedIcon fontSize='small' />
            <Typography variant='body1' ml={1}>
              Редактиране
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => setOpen(true)}>
            <DeleteForeverOutlinedIcon fontSize='small' />
            <Typography variant='body1' ml={1}>
              Изтриване
            </Typography>
          </MenuItem>
        </Menu>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle color={theme.palette.secondary.main}>Сигурeн ли си?</DialogTitle>
          <DialogContent>
            <DialogContentText color={theme.palette.secondary.main}>
              Сигурeн ли си, че искаш да премахнеш {selectedCar?.carMark} с регистрационен номер{' '}
              {selectedCar?.carNumber}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlexableButton onClick={() => setOpen(false)} text='Отказване' />
            <FlexableButton onClick={handleDeleteClick} autoFocus text='Потвърждение' />
          </DialogActions>
        </Dialog>

        {selectedCar && (
          <EditCarModal
            open={openEditModal}
            onClose={() => {
              setOpenEditModal(false)
              handleMenuClose()
            }}
            car={selectedCar}
            companyId={user?.companyId}
          />
        )}
      </Box>
    </Box>
  )
}

export default Cars
