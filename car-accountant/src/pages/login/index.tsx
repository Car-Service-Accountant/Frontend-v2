import { Box, Divider, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import RightSideWraper, { LeftSideWraper, classesRightSide, classesLeftSide } from './login.style'
import * as yup from 'yup'
import { Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { FlexableButton } from '@/components/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useRouter } from 'next/router'
import { RootState, wrapper } from '@/features/redux/store'
import { asyncLogin } from '@/features/redux/auth/reducer'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import loginCompanyInfo from '@/constants/loginCompanyInfo'

const LeftSide = () => {
  const theme = useTheme()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()
  const checkoutSchema = yup.object().shape({
    email: yup.string().email('Въвели сте грешен Е-мейл').required('Полето е задължително'),

    password: yup
      .string()
      .required('Полето е задължително')
      .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
      .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),
  })

  const demoProfile = {
    email: 'demoProfile@abv.bg',
    password: 'asdasd',
  }

  const initialValues = {
    email: '',
    password: '',
  }

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])
  interface SubmitParams {
    email: string
    password: string
  }

  const handleFormSubmit = async ({ email, password }: SubmitParams) => {
    dispatch(asyncLogin({ email, password }))
    return router.push('/')
  }

  return (
    <RightSideWraper>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography color={theme.palette.secondary.dark} fontWeight='bold' fontSize={42} mb={'9px'}>
              Вход
            </Typography>
            <Divider sx={{ borderBottomWidth: 'medium', marginBottom: '32px', width: '62px' }}></Divider>
          </Box>
        </Box>

        {/*
        //to be added when integrate google login
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        
          <Button className={classesRightSide.googleDemoButton}>
            <Image src={'/../public/pics/googleLogo.png'} width={20} height={20} alt='Google logo' />
            <Typography>Google</Typography>
          </Button>
        </Box> */}
        {/* 
        <Box className={classesRightSide.dividerLogin}>
          <Divider color={theme.palette.secondary.main}>
            <Typography color={theme.palette.secondary.main} fontWeight='bold'>
              или
            </Typography>
          </Divider>
        </Box> */}
        <Box className={classesRightSide.loginForm}>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                <Box display='flex' alignItems='center' flexDirection='column'>
                  <Typography
                    className={classesRightSide.fieldLabel}
                    color={theme.palette.secondary.main}
                    fontWeight='bold'
                  >
                    Потребителско име
                  </Typography>
                  <TextField
                    fullWidth
                    color='primary'
                    variant='outlined'
                    type='text'
                    placeholder='Потребителско име'
                    onChange={handleChange}
                    value={values.email}
                    name='email'
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    className={classesRightSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                  <Typography
                    className={classesRightSide.fieldLabel}
                    color={theme.palette.secondary.main}
                    fontWeight='bold'
                  >
                    Парола
                  </Typography>
                  <TextField
                    fullWidth
                    color='primary'
                    variant='outlined'
                    type='password'
                    placeholder='Парола'
                    onChange={handleChange}
                    value={values.password}
                    name='password'
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    className={classesRightSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                  <Link
                    href='/recoveryPassword'
                    className={classesRightSide.fieldLabel}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography color={theme.palette.secondary.dark} fontWeight='bold'>
                      Забравена парола ?
                    </Typography>
                  </Link>
                </Box>
                <Box display='flex' justifyContent='center' mt='20px'>
                  <FlexableButton type='submit' text='Вход' />
                </Box>
                <Box display='flex' justifyContent='center' mt='20px'>
                  <FlexableButton onClick={() => handleFormSubmit(demoProfile)} text='Demo' />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </RightSideWraper>
  )
}

const RightSide = () => {
  const theme = useTheme()

  return (
    <LeftSideWraper>
      <Box>
        <Box mb={19}>
          <Typography variant='h6' color={theme.palette.background.default} className={classesLeftSide.mainText}>
            <b>AUTOLOG</b> e уеб приложение за управление на ремонта по един автомобил, предлага всичко, от което се
            нуждае ръководителят на един автосервиз!
          </Typography>
        </Box>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {loginCompanyInfo &&
            loginCompanyInfo.map((item, index) => (
              <SwiperSlide key={index} className={classesLeftSide.sliderBox}>
                <Box padding={5}>
                  <Image
                    src={item.imageUrl}
                    style={{ width: '30%', height: '30%', objectFit: 'cover' }}
                    width={300}
                    height={300}
                    alt={`Slide ${index + 1}`}
                  />
                  <Box>
                    <Typography
                      variant='h4'
                      fontSize={26}
                      color={theme.palette.background.default}
                      sx={{ marginBottom: '20px' }}
                    >
                      {item.header}
                    </Typography>
                    <Typography variant='h6' fontSize={16} color={theme.palette.background.default}>
                      {item.message}
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </LeftSideWraper>
  )
}

export default function Login() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Grid container flexDirection={isMobile ? 'column-reverse' : undefined}>
      <Grid
        item
        xs={isMobile ? undefined : 7}
        sx={{
          height: '100vh',
          width: '100%',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <RightSide />
      </Grid>
      <Grid
        item
        xs={isMobile ? undefined : 5}
        sx={{
          width: '100%',
          height: 'auto',
          backgroundColor: theme.palette.background.paper,
          alignItems: 'center',
        }}
      >
        <LeftSide />
      </Grid>
    </Grid>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  // Dispatch the HYDRATE action to populate the initial state on the server
  return {
    props: {},
  }
})
