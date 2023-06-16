import { Box, Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import Wraper, { classes } from './login.style'
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const checkoutSchema = yup.object().shape({
        email: yup
            .string()
            .email("Въвели сте грешен Е-мейл")
            .required("Полето е задължително"),

        password: yup
            .string()
            .required("Полето е задължително")
            .min(4, "Полето трябва да съдържа между 4 и 16 символа")
            .max(16, "Полето трябва да съдържа между 4 и 16 символа"),
    });
    const initialValues = {
        email: "",
        password: "",
    };

    return (
        <Wraper style={{ height: "100vh" }}>
            <Grid container>
                <Grid item xs={7} className={classes.left} >
                    <p>asd</p>
                </Grid>
                <Grid item xs={5} className={classes.right}>
                    <Box className={classes.loginForm}>
                        <Formik
                            onSubmit={() => {
                                console.log("for now nothing happen here , stil wait for func :D");
                            }}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                            className={classes.loginField}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            type="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={touched.password && !!errors.password}
                                            helperText={touched.password && errors.password}
                                            className={classes.loginField}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="center" mt="20px">
                                        <Button type="submit" color="primary" variant="contained" >
                                            Вход
                                        </Button>
                                        {/* <Button onClick={onDemoLogin} color="secondary" variant="contained">
                                            Демо профил
                                        </Button> */}
                                    </Box>
                                    <Typography component={"div"} display="flex" justifyContent="center" mt="20px">
                                        Ако все още нямате фирма, може да отворите такава като я регистрирате
                                        <Box ml={1}>
                                            <Link href="/register">Тук</Link>
                                        </Box>
                                    </Typography>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
            </Grid>
        </Wraper>
    );
}
