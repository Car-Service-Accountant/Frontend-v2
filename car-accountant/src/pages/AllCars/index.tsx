import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  Typography,
  useTheme,
  MenuItem,
  useMediaQuery,
  LinearProgress,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { carTypes } from '@/features/redux/cars/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { useDispatch } from 'react-redux'
import { asyncDeleteCar, asyncFetchAllCars } from '@/features/redux/cars/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useRouter } from 'next/router'

// const URL = API_URL

const Cars = () => {
  const theme = useTheme()
  const [cars, setCars] = useState<carTypes[] | null>(null)
  const [selectedId, setSelectedId] = useState(null)
  const [editedId, setEditedId] = useState(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [selecredRow, setSelectedRow] = useState(null)
  const data = useSelector((state: RootState) => state.cars)
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const router = useRouter()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    if (user) {
      dispatch(asyncFetchAllCars(user?.companyId))
    }
  }, [user])

  const handleRowClick = (params: any) => {
    if (params.field !== 'Action') {
      setSelectedRow(params.id)
    }
  }

  const handleMenuOpen = (event: any) => {
    setSelectedId(event.currentTarget.dataset.id)
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setSelectedId(null)
    setMenuAnchorEl(null)
  }

  const handleEditClick = () => {
    setEditedId(selectedId)
  }

  const handleDeleteClick = async () => {
    if (selectedId) {
      dispatch(asyncDeleteCar(selectedId))
    }
  }

  // if (editedId) {
  //   return <Navigate to={`/data.cars/edit/${editedId}`} />
  // }

  if (selecredRow) {
    router.push(`/data.cars/${selecredRow}`, undefined, { shallow: true })
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
      // disableColumnSelector: true,
      sortable: false,
      width: 0,
      renderCell: (params) => (
        <IconButton size='large' onClick={handleMenuOpen} data-id={params.row._id}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]
  if (data?.cars === null && data?.isDoneLoading) {
    return (
      <Typography variant='h1' style={{ display: 'flex', justifyContent: 'space-around', marginTop: '90px' }}>
        Все още няма създадени коли
      </Typography>
    )
  }

  if (!data?.isDoneLoading) {
    return <LinearProgress color='primary' />
  }
  if (data.cars?.length !== 0) {
    return (
      <Box p={2}>
        <Box
          height='75vh'
          style={{ boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)' }}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: `solid 2px ${theme.palette.secondary.light}`,
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none !important',
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
            '& .MuiDataGrid-row': {
              '&:hover': {
                backgroundColor: `${theme.palette.background.default} !important`,
              },
              display: 'flex',
              flexWrap: 'nowrap',
              minWidth: '270px!important',
              '& div': {},
            },
          }}
        >
          {data?.cars && (
            <DataGrid
              rows={data?.cars}
              getRowId={(data) => data._id}
              columns={columns}
              disableRowSelectionOnClick
              onCellDoubleClick={handleRowClick}
              columnVisibilityModel={{
                _id: false,
              }}
              style={{ outline: 'none', boxShadow: 'none' }}
              sx={{
                '.MuiDataGrid-columnHeader:focus': {
                  outline: 'none !important',
                },
              }}
            />
          )}
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleEditClick}>
              <ModeEditOutlineOutlinedIcon fontSize='small' />
              <Typography variant='body1' ml={1}>
                Редактиране
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
              <DeleteForeverOutlinedIcon fontSize='small' />
              <Typography variant='body1' ml={1}>
                Изтриване
              </Typography>
            </MenuItem>
          </Menu>
          {/* <IconButton>
          <ArrowBackIcon />
        </IconButton> */}
        </Box>
      </Box>
    )
  }
}

export default Cars
