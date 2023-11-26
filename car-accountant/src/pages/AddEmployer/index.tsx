import { Box, FormControl, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/features/redux/store'
import { asyncAddEmployers } from '@/features/redux/employers/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { enqueueSnackbar } from 'notistack'
import PrimaryButton from '@/components/PrimaryButton'

const PREFIX = 'add-employer'

const classes = {
  formWrapper: `${PREFIX}-formWrapper`,
  divider: `${PREFIX}-divider`,
}

const StyledWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [`& .${classes.formWrapper}`]: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
  },
  [`& .${classes.divider}`]: {
    border: `solid 1px ${theme.palette.primary.main}`,
  },
}))

const AddEmployer = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user)
  const isRejected = useSelector((state: RootState) => state.employers.isRejected)

  const handleFormSubmit = (values) => {
    if (user && user.companyId) {
      const data = {
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
        rePassword: values.rePassword,
        role: values.role,
        username: values.username,
        companyID: user.companyId,
      }
      if (user.role === 'админ' || user.role === 'мениджър') {
        dispatch(asyncAddEmployers(data))
        enqueueSnackbar(`Успешно направихте ${values.username} част от фирмата`, { variant: 'success' })
        if (!isRejected) {
          router.push('/employers')
        }
      } else {
        enqueueSnackbar('Нямате права за това действие', { variant: 'error' })
      }
    }
  }

  return (
    <StyledWrapper>
      <Box className={classes.formWrapper}>
        <Box p={4}>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
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
                    label='Име на служителя'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    name='username'
                    error={!!touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='text'
                    label='E-mail'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    label='Парола'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name='password'
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='password'
                    label='Повторете паролата'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rePassword}
                    name='rePassword'
                    error={!!touched.rePassword && !!errors.rePassword}
                    helperText={touched.rePassword && errors.rePassword}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <TextField
                    fullWidth
                    variant='outlined'
                    type='number'
                    label='Телефонен номер'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name='phoneNumber'
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: 'span 2' }}
                  />
                  <FormControl sx={{ gridColumn: 'span 2' }}>
                    <InputLabel>Позиция</InputLabel>
                    <Select
                      variant='outlined'
                      label='Позиция'
                      name='role'
                      value={values.role || ''}
                      onChange={handleChange}
                    >
                      <MenuItem value='мениджър'>Мениджър</MenuItem>
                      <MenuItem value='служител'>Служител</MenuItem>
                    </Select>
                  </FormControl>
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
  username: yup
    .string()
    .required('Полето е задължително')
    .min(3, 'Полето трябва да е между 3 и 20 символа')
    .max(20, 'Полето трябва да е между 3 и 20 символа'),

  email: yup.string().email('Въвели сте грешен Е-мейл').required('Полето е задължително'),

  password: yup
    .string()
    .required('Полето е задължително')
    .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
    .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),

  rePassword: yup
    .string()
    .required('Полето е задължително')
    .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
    .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),

  phoneNumber: yup
    .string()
    .required('Полето е задължително')
    .min(9, 'Полето не може да бъде по-малко от 10 символа , започващо с нула')
    .max(9, 'Полето не може да бъде по-малко от 10 символа , започващо с нула'),
})
const initialValues = {
  username: '',
  email: '',
  password: '',
  rePassword: '',
  phoneNumber: '',
  role: '',
}

export default AddEmployer
