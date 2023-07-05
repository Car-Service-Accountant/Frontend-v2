import { Box, Button, Divider, Grid, TextField, Typography, useTheme } from '@mui/material';
import RightSideWraper, { LeftSideWraper, classesRightSide, classesLeftSide } from './login.style';
import * as yup from 'yup';
import { Formik } from 'formik';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import PrimaryButton from '@/components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, wrapper } from '@/redux/store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useRouter } from 'next/router';
import { asyncLogin } from '@/redux/auth/reducer';
import { GetServerSidePropsContext } from 'next';


const LeftSide = () => {
  const theme = useTheme()
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const user = useSelector((state: RootState) => state)
  const router = useRouter();
  const checkoutSchema = yup.object().shape({
    email: yup.string().email('Въвели сте грешен Е-мейл').required('Полето е задължително'),

    password: yup
      .string()
      .required('Полето е задължително')
      .min(4, 'Полето трябва да съдържа между 4 и 16 символа')
      .max(16, 'Полето трябва да съдържа между 4 и 16 символа'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  interface SubmitParams {
    email: string,
    password: string
  }

  const handleFormSubmit = async ({ email, password }: SubmitParams) => {
    dispatch(asyncLogin({ email, password }))
    router.push('')
    // const response = await handleLogin(values.email, values.password);
    // if (response) {
    //   navigate('/')
    // }
  };


  return (
    <RightSideWraper>
      <Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <Typography color={theme.palette.secondary.dark} fontWeight="bold" fontSize={42} mb={"9px"}>
              Вход
            </Typography>
            <Divider sx={{ borderBottomWidth: "medium", marginBottom: "32px", width: "62px" }}>
            </Divider>
          </Box>
        </Box >

        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Button className={classesRightSide.googleDemoButton} >
            <Image
              src={"/../public/pics/googleLogo.png"}
              width={20}
              height={20}
              alt='Google logo'
            />
            <Typography >Google</Typography>
          </Button>
        </Box >

        <Box className={classesRightSide.dividerLogin}>
          <Divider color={theme.palette.secondary.main}>
            <Typography color={theme.palette.secondary.main} fontWeight="bold">или</Typography>
          </Divider>
        </Box>
        <Box className={classesRightSide.loginForm}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Box display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                  <Typography className={classesRightSide.fieldLabel} color={theme.palette.secondary.main} fontWeight="bold">
                    Потребителско име
                  </Typography>
                  <TextField
                    fullWidth
                    color='primary'
                    variant="outlined"
                    type="text"
                    placeholder='Потребителско име'
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    className={classesRightSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                  <Typography className={classesRightSide.fieldLabel} color={theme.palette.secondary.main} fontWeight="bold">
                    Парола
                  </Typography>
                  <TextField
                    fullWidth
                    color='primary'
                    variant="outlined"
                    type="password"
                    placeholder='Парола'
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    className={classesRightSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                  <Link href="/recoveryPassword" className={classesRightSide.fieldLabel}>
                    <Typography color={theme.palette.secondary.dark} fontWeight="bold">
                      Забравена парола ?
                    </Typography>
                  </Link>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px" >
                  <PrimaryButton text="Вход" link="/" />
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

  const data = [{
    message: "Не са ви нужни никакви задълбочени технически знания, за употребата на нашето приложение за управление на автосервиз. Може да попълвате всякаква информация за вашите клиенти – регистрационни номера, марка и модел на автомобила, информация за клиента и други.",
    header: "Лесен и организиран интерфейс",
  },
  {
    message: "mess2",
    header: "header2",
  },
  {
    message: "mess3",
    header: "header3",
  },
  {
    message: "mess4",
    header: "header4",
  },
  {
    message: "mess5",
    header: "header5",
  }]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const theme = useTheme()

  return (
    <LeftSideWraper>
      <Box sx={{ marginTop: '65px', }}>
        <Box>
          <Box>
            <Typography variant='h6' className={classesLeftSide.mainText}>
              <b>AUTOLOG</b> e уеб приложение за управление на ремонта по един автомобил, предлага всичко, от което се нуждае ръководителят на един автосервиз!
            </Typography>
          </Box>
          <Box sx={{
            marginLeft: "35%",
            marginTop: "30px",
          }}>
            <Image
              src={"/../public/pics/mainLogoLogin.png"}
              width={400}
              height={400}
              alt='Missing logo'
            />
          </Box>
        </Box>
        <Box className={classesLeftSide.slider}>
          <Slider {...settings}>
            {data.map((item, index) => (
              <Box key={index} className={classesLeftSide.sliderBox}>
                <Typography variant="h4" fontSize={26} sx={{ marginBottom: "20px" }}>{item.header}</Typography>
                <Typography variant="h6" fontSize={16} >{item.message}</Typography>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </LeftSideWraper>
  );
}

export default function Login() {

  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={7} sx={{
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
      }}>
        <RightSide />
      </Grid>
      <Grid item xs={5} sx={{
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        display: "grid",
        alignItems: "center",
      }}>
        <LeftSide />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
  // Dispatch the HYDRATE action to populate the initial state on the server
  return {
    props: {},
  };
});