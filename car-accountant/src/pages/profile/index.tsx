import { FlexableButton } from '@/components/PrimaryButton'
import { asyncAccountUpdate, asyncAuthentication } from '@/features/redux/auth/reducer'
import { RootState } from '@/features/redux/store'
import { Avatar, Box, Divider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import * as yup from 'yup'

// const LeftSide = () => {
//   const user = useSelector((state: RootState) => state.auth.user)
//   const theme = useTheme()

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//       }}
//     >
//       <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pl: 6, pr: 6, pt: 2 }}>
//         <Avatar>{user?.username?.[0]?.toUpperCase()}</Avatar>
//         <Typography pt={2} pb={1}>
//           {user?.username}
//         </Typography>
//       </Box>
//       <IconButton
//         sx={{
//           justifyContent: 'start',
//           paddingLeft: theme.spacing(1.5),
//           borderRadius: 0,
//           width: '100%',
//           '&:hover': { backgroundColor: theme.palette.background.default },
//         }}
//       >
//         <Typography textAlign='start' fontWeight='600' fontSize='0.8rem'>
//           Информация за профила
//         </Typography>
//       </IconButton>
//       <IconButton
//         sx={{
//           justifyContent: 'start',
//           paddingLeft: theme.spacing(1.5),
//           borderRadius: 0,
//           width: '100%',
//           '&:hover': { backgroundColor: theme.palette.background.default },
//         }}
//       >
//         <Typography textAlign='start' fontWeight='600' fontSize='0.8rem'>
//           Снимка
//         </Typography>
//       </IconButton>
//       <IconButton
//         sx={{
//           justifyContent: 'start',
//           paddingLeft: theme.spacing(1.5),
//           borderRadius: 0,
//           width: '100%',
//           '&:hover': { backgroundColor: theme.palette.background.default },
//         }}
//       >
//         <Typography textAlign='start' fontWeight='600' fontSize='0.8rem'>
//           Смяна на парола
//         </Typography>
//       </IconButton>
//     </Box>
//   )
// }

const RightSide = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const theme = useTheme()
  const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'))

  const handleFormSubmit = async (values) => {
    if (values) {
      await dispatch(asyncAccountUpdate({ ...values, id: user?._id }))
      await dispatch(asyncAuthentication())
      router.push('/')
    }
  }

  return (
    <Box m='20px' width='70%' height='100%' display='flex' flexDirection='column' alignItems='center'>
      <Avatar sx={{ marginBottom: 3, width: 152, height: 152, backgroundColor: theme.palette.primary.main }}>
        {user?.username?.[0]?.toUpperCase()}
      </Avatar>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          username: user?.username,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
          role: user?.role,
          // oldPassword: '',
          // password: '',
        }}
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
                disabled
                label='Позиция'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name='role'
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* <TextField
                fullWidth
                variant='outlined'
                type='text'
                label='Стара парола'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.oldPassword}
                name='oldPassword'
                error={!!touched.oldPassword && !!errors.oldPassword}
                helperText={touched.oldPassword && errors.oldPassword}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='outlined'
                type='text'
                label='Нова парола'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name='password'
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 2' }}
              /> */}
            </Box>
            <Box
              display='flex'
              flexDirection='row'
              flexWrap='wrap'
              alignContent='space-between'
              justifyContent='space-around'
              mt='20px'
            >
              <FlexableButton margin={isNonMobile ? undefined : '5px'} type='submit' text='Запази' />

              <FlexableButton
                margin={isNonMobile ? undefined : '5px'}
                type='button'
                text='Назад'
                onClick={() => router.push('/')}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

const Profile = () => {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 5px 0px rgba(128, 128, 128, 0.20)',
          minHeight: '80vh',
        }}
      >
        <Typography
          fontSize={22}
          fontWeight={theme.typography.fontWeightBold}
          style={{ paddingLeft: '26px', paddingTop: '20px', paddingBottom: '20px' }}
        >
          Настройки на профила
        </Typography>
        <Divider sx={{ mb: 4, border: `solid 1px ${theme.palette.primary.main}` }}></Divider>
        <Box display='flex' justifyContent='center'>
          {/* <Box display='flex' justifyContent='center' alignItems='center'>
          <img src='../../assets/demo-profile.png' alt='Missing pic' height={180}></img>
        </Box> */}
          {/* <LeftSide />
        <Divider sx={{ borderWidth: '1px' }} orientation='horizontal' /> */}
          <RightSide />
        </Box>
      </Box>
    </>
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
    .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
    .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),

  oldPassword: yup
    .string()
    .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
    .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),

  phoneNumber: yup
    .string()
    .required('Полето е задължително')
    .min(10, 'Полето не може да бъде по-малко от 10 символа , започващо с нула')
    .max(10, 'Полето не може да бъде по-малко от 10 символа , започващо с нула'),
})

export default Profile
