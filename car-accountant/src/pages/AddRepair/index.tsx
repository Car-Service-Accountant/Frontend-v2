import { Box, Button, Divider, TextField, Typography, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { v4 } from 'uuid'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { StyledBox, classes } from './AddCar.style'
import PrimaryButton from '@/components/PrimaryButton'
import { asyncFetchCar } from '@/features/redux/cars/reducer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { partsTypes } from '@/features/redux/repairs/types'
import { asyncSetRepair } from '@/features/redux/repairs/reducer'
import { useRouter } from 'next/router'

// const URL = API_URL

interface reairServicesProps {
  serviceType: string
  laborCost: number | null
  _id?: string
}

const CreateRepair = () => {
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const car = useSelector((state: RootState) => state.cars.currentCar)
  const [parts, setParts] = useState<partsTypes[]>([])
  const [repairsServices, setRepairsServices] = useState<reairServicesProps[]>([])
  const [sendData, setSendData] = useState(false)
  const user = useSelector((state: RootState) => state.auth.user)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSuperSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const router = useRouter()

  console.log(parts)

  const carHandleFormSubmit = async (values: any) => {
    console.log('values =>', values)

    if (values.carNumber.length === 8 && user) {
      if (user && values) {
        dispatch(asyncFetchCar({ _id: values.carNumber, companyId: user.companyId }))
      }
    }
  }

  const partsHandleFormSubmit = (values: partsTypes) => {
    console.log('partsHandleFormSubmit =>', values)

    // showSnackbar(`Успешно добавихте част!`, 'success')
    setParts((prevRepairs) => [...prevRepairs, { _id: v4(), ...values }])
  }

  const deleteRepairHandler = (values: partsTypes) => {
    if (values._id) {
      console.log('deleteRepairHandler =>', values._id)
      setParts((prevRepairs) => prevRepairs.filter((repair) => repair._id !== values._id))
    }

    // showSnackbar(`Успешно изтрихте част!`, 'success')
  }

  const repairServiceHandleFormSubmit = (values: reairServicesProps) => {
    console.log('repairServiceHandleFormSubmit =>', values)

    // showSnackbar(`Успешно добавихте вид услуга!`, 'success')
    setRepairsServices((prevService) => [...prevService, { _id: v4(), ...values }])
  }

  const deleteRepairServicesHandler = (values: reairServicesProps) => {
    if (values._id) {
      console.log('deleteRepairServicesHandler =>', values._id)
      setRepairsServices((prevRepairs) => prevRepairs.filter((repair) => repair._id !== values._id))
    }

    // showSnackbar(`Успешно премахнахте вид услуга!`, 'success')
  }

  const finalizeRepair = async () => {
    if (user && car) {
      const carId = car._id
      if (parts?.length === 0) {
        // showSnackbar(`Няма добавени части!`, 'error')
        return
      }
      if (repairsServices.length === 0) {
        // showSnackbar(`Няма добавена вид услуга!`, 'error')
        return
      }

      const stackedRepayerServices = repairsServices.map((service) => service?.serviceType)
      const totalLaborCost = repairsServices.reduce((acc, curr) => Number(acc) + Number(curr?.laborCost), 0)
      const clearIdsFromParts = parts.map((part) => {
        // eslint-disable-next-line no-unused-vars
        const { _id, ...rest } = part
        return rest
      })

      const data = {
        parts: clearIdsFromParts,
        service: stackedRepayerServices,
        priceForLabor: totalLaborCost,
        comanyHoldRepairs: user.companyId,
        worker: user._id,
        note: 'Empty by default for now',
      }
      const response = await dispatch(asyncSetRepair({ carId, data }))
      if (response.meta.requestStatus !== 'fulfilled') {
        setSendData(false)
      } else {
        setSendData(true)
      }
    }
  }

  if (sendData) {
    router.push('/')
  }

  return (
    <StyledBox>
      <Box>
        <Typography p={3} fontWeight={600} fontSize={22}>
          Добави на ремонт
        </Typography>
        <Divider className={classes.divider} />
      </Box>
      <Box className={classes.wrapper}>
        {!car && (
          <>
            <Formik
              onSubmit={carHandleFormSubmit}
              initialValues={carInitialValues}
              validationSchema={carCheckoutSchema}
            >
              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isValid }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <Box
                      display='grid'
                      gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                      sx={{
                        '& > div': {
                          gridColumn: { lg: 'span 2', md: 'span 3', sm: 'span 4', xs: 'span 4' },
                        },
                      }}
                    >
                      <TextField
                        fullWidth
                        variant='outlined'
                        type='text'
                        label='Номер на колата'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.carNumber}
                        name='carNumber'
                        error={!!touched.carNumber && !!errors.carNumber}
                        helperText={touched.carNumber && errors.carNumber ? errors.carNumber : ''}
                        sx={{ gridColumn: 'span 2' }}
                      />
                    </Box>
                    <Box sx={{ opacity: isValid ? '1' : '0.5' }} mt={2}>
                      <PrimaryButton text='Добави' small />
                    </Box>
                  </form>
                </>
              )}
            </Formik>
          </>
        )}
        {car && (
          <>
            <Box display='grid' gap='30px'>
              <Box
                display='grid'
                gap='10px'
                gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <Typography fontSize={20} sx={{ gridColumn: 'span 2' }}>
                  Информация за колата
                </Typography>
                <Divider sx={{ gridColumn: 'span 4' }}></Divider>
              </Box>
              <Box
                display='grid'
                gap='30px'
                gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                sx={{
                  '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                }}
              >
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Номер
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.carNumber}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Вин на колата
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.carVIN}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Собственик
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.owner}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Телефонен номер
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.phoneNumber}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Модел на колата
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.carModel}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
                <Box sx={{ gridColumn: 'span 2' }}>
                  <Typography fontWeight={600} mb={1}>
                    Марка на колата
                  </Typography>
                  <TextField
                    fullWidth
                    value={car.carMark}
                    variant='outlined'
                    disabled
                    className={classes.disabledTextfield}
                  />
                </Box>
              </Box>
              <Box>
                <Box
                  display='grid'
                  gap='20px'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                  }}
                >
                  <Typography fontSize={20} sx={{ gridColumn: 'span 2' }}>
                    Информация на ремонта
                  </Typography>
                  <Divider sx={{ gridColumn: 'span 4', mb: 4 }}></Divider>
                </Box>
                <Formik
                  key='repairKey'
                  onSubmit={partsHandleFormSubmit}
                  initialValues={partsInitialValues}
                  validationSchema={partsCheckoutSchema}
                >
                  {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                          '& > div': {
                            gridColumn: isNonMobile ? undefined : 'span 4',
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='Резервна част'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.partName}
                          name='partName'
                          error={!!touched.partName && !!errors.partName}
                          helperText={touched.partName && errors.partName}
                          sx={{ gridColumn: 'span 2' }}
                        />
                        <TextField
                          fullWidth
                          variant='outlined'
                          type='number'
                          label='Цена за сервиза'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.servicePrice > 0 ? values.servicePrice : null}
                          name='servicePrice'
                          error={!!touched.servicePrice && !!errors.servicePrice}
                          helperText={touched.servicePrice && errors.servicePrice}
                          sx={{ gridColumn: 'span 1' }}
                        />
                        <TextField
                          fullWidth
                          variant='outlined'
                          type='number'
                          label='Цена за клиента'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.clientPrice > 0 ? values.clientPrice : null}
                          name='clientPrice'
                          error={!!touched.clientPrice && !!errors.clientPrice}
                          helperText={touched.clientPrice && errors.clientPrice}
                          sx={{ gridColumn: 'span 1' }}
                        />
                      </Box>
                      <Box display='flex' justifyContent='center' mt='20px'>
                        <Button type='submit' color='primary' variant='contained'>
                          <AddCircleOutlineOutlinedIcon />
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
              {parts.length > 0 && (
                <Box>
                  <Typography fontSize={20} style={{ display: 'flex', justifyContent: 'left' }}>
                    Резервни части
                  </Typography>
                  <Divider sx={{ gridColumn: 'span 4' }}></Divider>
                </Box>
              )}
              {parts.length > 0 &&
                parts.map((value) => (
                  <Box
                    key={value._id}
                    display='grid'
                    gap='10px'
                    gridTemplateColumns={isSuperSmall ? 'repeat(5, minmax(0, 1fr))' : 'repeat(12, minmax(0, 1fr))'}
                    justifyItems='center'
                    justifyContent='space-around'
                  >
                    <TextField
                      fullWidth
                      value={value.partName}
                      variant='outlined'
                      label='Резервна част'
                      sx={isSuperSmall ? { gridColumn: 'span 7' } : { gridColumn: 'span 5' }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      value={`${value.servicePrice} лв.`}
                      variant='outlined'
                      label='Цена за сервиза'
                      sx={isSuperSmall ? { gridColumn: 'span 2' } : { gridColumn: 'span 3' }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      value={`${value.clientPrice} лв.`}
                      variant='outlined'
                      label='Цена за клиента'
                      sx={isSuperSmall ? { gridColumn: 'span 2' } : { gridColumn: 'span 3' }}
                      disabled
                    />
                    <Box display='flex' sx={{ gridColumn: isSuperSmall ? 'span 0' : 'span 1', marginLeft: '20px' }}>
                      <Button type='button' variant='contained' onClick={() => deleteRepairHandler(value)}>
                        <HighlightOffOutlinedIcon />
                      </Button>
                    </Box>
                  </Box>
                ))}
              <Box>
                <Formik
                  key='repairServiceKey'
                  onSubmit={repairServiceHandleFormSubmit}
                  initialValues={repairServiceInitialValues}
                  validationSchema={repairServicesCheckoutSchema}
                >
                  {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                          '& > div': {
                            gridColumn: isNonMobile ? undefined : 'span 4',
                          },
                        }}
                      >
                        <TextField
                          fullWidth
                          variant='outlined'
                          type='text'
                          label='Вид услуга'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.serviceType}
                          name='serviceType'
                          error={!!touched.serviceType && !!errors.serviceType}
                          helperText={touched.serviceType && errors.serviceType}
                          sx={{ gridColumn: 'span 3' }}
                        />
                        <TextField
                          fullWidth
                          variant='outlined'
                          type='number'
                          label='Цена за труд'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.laborCost}
                          name='laborCost'
                          error={!!touched.laborCost && !!errors.laborCost}
                          helperText={touched.laborCost && errors.laborCost}
                          sx={{ gridColumn: 'span 1' }}
                        />
                      </Box>
                      <Box display='flex' justifyContent='center' mt='20px'>
                        <Button type='submit' color='primary' variant='contained'>
                          <AddCircleOutlineOutlinedIcon />
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>

              {repairsServices.length > 0 && (
                <Box>
                  <Typography fontSize={20} style={{ display: 'flex', justifyContent: 'center' }}>
                    Цена за труд
                  </Typography>
                  <Divider sx={{ gridColumn: 'span 4' }}></Divider>
                </Box>
              )}
              {repairsServices.length > 0 &&
                repairsServices.map((value) => (
                  <Box
                    key={value._id}
                    display='grid'
                    gap={isMobile ? '20px' : '30px'}
                    gridTemplateColumns={isMobile ? 'repeat(10, minmax(0, 1fr))' : 'repeat(10, minmax(0, 1fr))'}
                    justifyItems='center'
                    justifyContent='space-around'
                  >
                    <TextField
                      fullWidth
                      value={value.serviceType}
                      variant='outlined'
                      label='Услуга'
                      sx={isMobile ? { gridColumn: 'span 5' } : { gridColumn: 'span 6' }}
                      disabled
                    />
                    <TextField
                      fullWidth
                      value={`${value.laborCost} лв.`}
                      variant='outlined'
                      label='Цена за труд'
                      sx={isMobile ? { gridColumn: 'span 3' } : { gridColumn: 'span 3' }}
                      disabled
                    />
                    <Box display='flex' sx={{ gridColumn: isSuperSmall ? 'span 1' : 'span 1', marginLeft: '30px' }}>
                      <Button
                        type='button'
                        color='primary'
                        variant='contained'
                        onClick={() => deleteRepairServicesHandler(value)}
                      >
                        <HighlightOffOutlinedIcon />
                      </Button>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Box display='flex' justifyContent='center' mt='20px'>
              <Button type='submit' color='primary' variant='contained' onClick={() => finalizeRepair()}>
                Добави
              </Button>
            </Box>
          </>
        )}
      </Box>
    </StyledBox>
  )
}

const carCheckoutSchema = yup.object().shape({
  carNumber: yup
    .string()
    .required('Полето е задължително')
    .matches(/^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/, 'Полето трябва да съдържа валиден номер на кола например: NN9999NN'),
})

const partsCheckoutSchema = yup.object().shape({
  partName: yup
    .string()
    .required('Полето е задължително')
    .min(3, 'Полето трябва да е между 3 и 50 символа')
    .max(50, 'Полето трябва да е между 3 и 50 символа'),
  servicePrice: yup
    .number()
    .required('Полето е задължително')
    .positive('Позволени са само позитивни цифри (подлежи на промяна)'),
  clientPrice: yup
    .number()
    .required('Полето е задължително')
    .positive('Позволени са само позитивни цифри (подлежи на промяна)'),
})

const repairServicesCheckoutSchema = yup.object().shape({
  serviceType: yup
    .string()
    .required('Полето е задължително')
    .min(3, 'Полето трябва да е между 3 и 50 символа')
    .max(50, 'Полето трябва да е между 3 и 50 символа'),
  laborCost: yup
    .number()
    .required('Полето е задължително')
    .positive('Позволени са само позитивни цифри (подлежи на промяна)'),
})

const carInitialValues = {
  carNumber: '',
}

const partsInitialValues = {
  partName: '',
  servicePrice: 0,
  clientPrice: 0,
}

const repairServiceInitialValues = {
  serviceType: '',
  laborCost: null,
}

export default CreateRepair
