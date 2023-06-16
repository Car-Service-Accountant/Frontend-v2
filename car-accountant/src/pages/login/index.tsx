import { Box, Button, Container, Divider, FormControl, Grid, TextField, Typography, useTheme } from '@mui/material';
import LeftSideWraper, { classesLeftSide } from './login.style';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LeftSide = () => {

  const theme = useTheme()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  return (
    <LeftSideWraper>
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
          <Button className={classesLeftSide.googleDemoButton} >
            <Image
              src={"/../public/googleLogo.png"}
              width={20}
              height={20}
              alt='Google logo'
            />
            <Typography >Google</Typography>
          </Button>
        </Box >

        <Box className={classesLeftSide.dividerLogin}>
          <Divider color={theme.palette.secondary.main}>
            <Typography color={theme.palette.secondary.main} fontWeight="bold">или</Typography>
          </Divider>
        </Box>
        <Box className={classesLeftSide.loginForm}>
          <Formik
            onSubmit={() => {
              console.log('for now nothing happen here , stil wait for func :D');
            }}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <Box display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                  <Typography className={classesLeftSide.fieldLabel} color={theme.palette.secondary.main} fontWeight="bold">
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
                    className={classesLeftSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                  <Typography className={classesLeftSide.fieldLabel} color={theme.palette.secondary.main} fontWeight="bold">
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
                    className={classesLeftSide.loginField}
                    InputProps={{
                      style: { borderRadius: '12px' },
                    }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px" >
                  <Button className={classesLeftSide.joinText} type="submit" color="primary" variant="contained">
                    Вход
                  </Button>
                  {/* <Button onClick={onDemoLogin} color="secondary" variant="contained">
                                            Демо профил
                                          </Button> */}
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </LeftSideWraper>
  )
}

const RightSide = () => {

  return (
    <p>Right side for now</p>
  )

}

export default function Login() {

  const theme = useTheme();

  return (
    <Grid container>
      <Grid item xs={7} sx={{
        height: '100vh',
        backgroundColor: theme.palette.primary.main,
        display: "grid",
        alignItems: "center",
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
