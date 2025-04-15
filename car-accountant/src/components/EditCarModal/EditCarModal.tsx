import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, useTheme, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { FlexableButton } from '@/components/PrimaryButton'
import { carTypes } from '@/features/redux/cars/types'
import { useDispatch } from 'react-redux'
import { asyncFetchAllCars, asyncUpdateCar } from '@/features/redux/cars/reducer'
import { enqueueSnackbar } from 'notistack'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '@/features/redux/store'
import { AnyAction } from 'redux'

const EditCarModal = ({
  open,
  onClose,
  car,
  companyId,
}: {
  open: boolean
  onClose: () => void
  car: carTypes
  companyId?: string
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const [formData, setFormData] = useState({ ...car })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!companyId) return null
    try {
      await dispatch(asyncUpdateCar({ carId: car._id, data: formData }))
      enqueueSnackbar('Успешна редакция!', { variant: 'success' })

      dispatch(asyncFetchAllCars(companyId || '')) // презареждане на колите
      onClose()
    } catch (err) {
      console.error('Грешка при редакция', err)
      enqueueSnackbar('Грешка при редакция', { variant: 'error' })
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullScreen={isMobile}>
      <DialogTitle>Редактиране на кола</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin='dense'
          name='owner'
          label='Собственик'
          value={formData.owner}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='dense'
          name='carMark'
          label='Марка'
          value={formData.carMark}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='dense'
          name='carModel'
          label='Модел'
          value={formData.carModel}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='dense'
          name='carNumber'
          label='Рег. номер'
          value={formData.carNumber}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin='dense'
          name='carVIN'
          label='VIN номер'
          value={formData.carVIN}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='dense'
          name='phoneNumber'
          label='Телефон'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin='dense'
          name='buildDate'
          label='Дата на производство (dd/mm/yyyy)'
          value={formData.buildDate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <FlexableButton onClick={onClose} text='Отказ' />
        <FlexableButton onClick={handleSubmit} text='Запази' />
      </DialogActions>
    </Dialog>
  )
}

export default EditCarModal
