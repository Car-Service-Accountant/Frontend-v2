import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  Typography,
  useTheme,
  MenuItem,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { asyncDeleteEmployer, asyncFetchAllEmployers } from '@/features/redux/employers/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { useRouter } from 'next/router'
import { employerType } from '@/features/redux/employers/types'
import { enqueueSnackbar } from 'notistack'
import { FlexableButton } from '@/components/PrimaryButton'

const allEmployers = () => {
  const theme = useTheme()
  const employers = useSelector((state: RootState) => state.employers.employers)
  const user = useSelector((state: RootState) => state.auth.user)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null)
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleRowClick = (params: any) => {
    if (params.field !== 'Action') {
      router.push(`/employers/${params.id}`)
    }
  }

  const handleMenuOpen = (event: any) => {
    if (event) {
      setSelectedId(event?.currentTarget?.dataset?.id)
      setMenuAnchorEl(event?.currentTarget)
    }
  }

  const handleMenuClose = () => {
    setSelectedId(null)
    setMenuAnchorEl(null)
  }

  const handleDeleteClick = async () => {
    if (selectedId && user?.companyId) {
      await dispatch(asyncDeleteEmployer(selectedId))
      await dispatch(asyncFetchAllEmployers(user?.companyId))
      const employer = employers?.find((emp) => emp._id === selectedId)
      enqueueSnackbar(`Успешно премахнахте ${employer?.username}`, { variant: 'success' })
      setOpen(false)
      handleMenuClose()
    } else {
      enqueueSnackbar('Възникна грешка при изтриването', { variant: 'error' })
    }
  }

  useEffect(() => {
    if (user?.companyId) {
      dispatch(asyncFetchAllEmployers(user?.companyId))
    }
  }, [user?.companyId])
  const columns: GridColDef<employerType>[] = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0,
    },
    {
      field: 'username',
      headerName: 'Име на служителя',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'phoneNumber',
      headerName: 'Телефонен номер',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
    },
    {
      field: 'accessLevel',
      headerName: 'Ниво на достъп',
      flex: isMobile ? undefined : 1,
      width: isMobile ? 150 : 0,
      renderCell: ({
        row: { role },
      }: {
        row: {
          role: string
        }
      }) => {
        return (
          <Box
            width='100%'
            p='7px'
            display='flex'
            justifyContent='center'
            sx={{
              backgroundColor:
                role === 'админ'
                  ? theme.palette.primary.dark
                  : role === 'мениджър'
                  ? theme.palette.primary.main
                  : theme.palette.primary.light,
            }}
            borderRadius='4px'
          >
            {role === 'админ' && (
              <AdminPanelSettingsOutlinedIcon
                sx={{
                  marginRight: 2,
                }}
              />
            )}
            {role === 'мениджър' && (
              <SecurityOutlinedIcon
                sx={{
                  marginRight: 2,
                }}
              />
            )}
            {role === 'служител' && (
              <LockOpenOutlinedIcon
                sx={{
                  marginRight: 2,
                }}
              />
            )}
            <Typography>{role}</Typography>
          </Box>
        )
      },
    },
    {
      field: 'Action',
      headerName: '',
      sortable: false,
      width: 0,
      renderCell: (params: any) => (
        <IconButton sx={{ padding: 1 }} size='large' onClick={handleMenuOpen} data-id={params.row._id}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  if (!employers || employers?.length === 0) {
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
        <DataGrid
          rows={employers}
          getRowId={(employer) => employer._id}
          columns={columns}
          onCellDoubleClick={handleRowClick}
          disableRowSelectionOnClick
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
        <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => selectedId && router.push(`/employers/${selectedId}`)}>
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
          <DialogTitle color={theme.palette.secondary.main}>Премахване на служител</DialogTitle>
          <DialogContent>
            <DialogContentText color={theme.palette.secondary.main}>
              Сигурeн ли сте ,че искате да премахнете {employers?.find((emp) => emp._id === selectedId)?.username}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FlexableButton onClick={() => setOpen(false)} text='Отказване' />
            <FlexableButton onClick={handleDeleteClick} autoFocus text='Потвърждение' />
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default allEmployers
