import { Box, Button, Divider, TextField, Typography, styled, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useContext, useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { RootState, wrapper } from '@/features/redux/store'
import PrimaryButton from '@/components/PrimaryButton'
import { useSelector } from 'react-redux'
import { addCar } from '@/api/cars/action'
import { useRouter } from 'next/router'
// import { SnackbarContext } from "../../providers/snackbarProvider";

export interface carInfo {
  owner: string
  carNumber: string
  carModel: string
  carMark: string
  carVIN: string
  phoneNumber: string
  buildDate: string
}

const CreateCar = () => {
  const theme = useTheme()
  const isNonMobile = useMediaQuery('(min-width:750px)')
  const [isSubmitted, setIsSubmitted] = useState<boolean | string>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const companyId = useSelector((state: RootState) => state.auth.user?.companyId)
  const router = useRouter()

  // const showSnackbar = useContext(SnackbarContext);

  const PREFIX = 'add-car'

  const classes = {
    formWrapper: `${PREFIX}-formWrapper`,
    divider: `${PREFIX}-divider`,
  }

  const StyledWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(12),
    [`& .${classes.formWrapper}`]: {
      background: '#fff',
      borderRadius: '8px',
    },
    [`& .${classes.divider}`]: {
      border: `solid 1px ${theme.palette.primary.main}`,
    },
  }))

  const handleFormSubmit = async (values: carInfo) => {
    const body = { ...values, comanyHoldRepairs: companyId || '' }
    const returned: boolean | string = await addCar(body)
    // if (returned === true) {
    //   setIsSubmitted(returned)
    // } else {
    //   setErrorMsg(returned)
    //   setIsSubmitted(false)
    // }
  }

  if (isSubmitted) {
    router.push('/')
  }

  return (
    <StyledWrapper>
      <Box className={classes.formWrapper}>
        <Typography color='red' fontSize={20}>
          {errorMsg}
        </Typography>
        <Typography
          fontSize={22}
          fontWeight={theme.typography.fontWeightBold}
          style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '20px' }}
        >
          Добавяне на кола
        </Typography>
        <Divider className={classes.divider} sx={{ mb: 4 }}></Divider>
        <Box sx={{ padding: '20px' }}>
          <Formik
            className={classes.formWrapper}
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display='grid'
                  gap='30px'
                  gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                  sx={{
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
                  }}
                >
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Собственик на колата'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.owner}
                    name='owner'
                    error={!!touched.owner && !!errors.owner}
                    helperText={touched.owner && errors.owner}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Марка на колата'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carMark}
                    name='carMark'
                    error={!!touched.carMark && !!errors.carMark}
                    helperText={touched.carMark && errors.carMark}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Телефонен номер'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name='phoneNumber'
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Модел на колата'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carModel}
                    name='carModel'
                    error={!!touched.carModel && !!errors.carModel}
                    helperText={touched.carModel && errors.carModel}
                    sx={{ gridColumn: 'span 2' }}
                  />
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
                    helperText={touched.carNumber && errors.carNumber}
                    sx={{ gridColumn: { sm: 'span 2', md: 'span 1' } }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='Вин на колата'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carVIN}
                    name='carVIN'
                    error={!!touched.carVIN && !!errors.carVIN}
                    helperText={touched.carVIN && errors.carVIN}
                    sx={{ gridColumn: { sm: 'span 2', md: 'span 1' } }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='date'
                    label='Година на производство'
                    placeholder='asdasd'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.buildDate}
                    name='buildDate'
                    error={!!touched.buildDate && !!errors.buildDate}
                    helperText={touched.buildDate && errors.buildDate}
                    sx={{ gridColumn: 'span 2' }}
                  />
                </Box>
                <Box display='flex' justifyContent='center' mt='20px'>
                  <PrimaryButton text='Добави' />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </StyledWrapper>
  )
}

const checkoutSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Полето е задължително')
    .min(3, 'Полето трябва да е между 3 и 20 символа')
    .max(20, 'Полето трябва да е между 3 и 20 символа'),

  carNumber: yup
    .string()
    .required('Полето е задължително')
    .min(8, 'Полето трябва да съдържа 8 символа предържайте се към примера "PB3313MG"')
    .max(8, 'Полето трябва да съдържа 8 символа предържайте се към примера "PB3313MG"'),

  carVIN: yup
    .string()
    .required('Полето е задължително')
    .min(17, 'Полето трябва да съдържа 17 символа предържайте се към примера "1HGBH41XMN1091176"')
    .max(17, 'Полето трябва да съдържа 17 символа предържайте се към примера "1HGBH41XMN109186"'),

  carModel: yup.string().required('Полето е задължително'),

  carMark: yup.string().required('Полето е задължително'),

  phoneNumber: yup
    .string()
    .required('Полето е задължително')
    .min(10, 'Полето не може да съдържа повече от 10 символа')
    .max(10, 'Полето не може да съдържа повече от 10 символа'),
  buildDate: yup.date().required('Полето е задължително'),
})
const initialValues = {
  owner: '',
  carNumber: '',
  carModel: '',
  carMark: '',
  carVIN: '',
  phoneNumber: '',
  buildDate: '',
}

export default CreateCar
