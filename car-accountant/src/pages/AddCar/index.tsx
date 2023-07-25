import { Box, Button, Divider, TextField, Typography, styled, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useState } from "react";
import { wrapper } from "@/redux/store";
import { GetServerSidePropsContext } from "next";
// import { SnackbarContext } from "../../providers/snackbarProvider";

// const URL = API_URL

const CreateCar = () => {
  const theme = useTheme()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const showSnackbar = useContext(SnackbarContext);


  const handleFormSubmit = (values: any) => {
    console.log("values ==> ", values);

  }

  const PREFIX = "add-car"

  const classes = {
    formWrapper: `${PREFIX}-formWrapper`,
    divider: `${PREFIX}-divider`,
  }

  const StyledWrapper = styled(Box)(({ theme }) => ({
    minHeight: "93vh",
    [`& .${classes.formWrapper}`]: {
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
    }, [`& .${classes.divider}`]: {
      border: "2px"
    },





  }))



  // const handleFormSubmit = (values) => {
  //   const body = { ...values, comanyHoldRepairs: companyId }
  //   console.log(body);
  //   try {
  //     fetch(`${URL}car`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     }).then((response) => {
  //       if (response.status !== 200) {
  //         throw new Error(
  //           "Нещо се обърка моля проверете полетата и опитайте отново.",
  //           "error"
  //         );
  //       }
  //       showSnackbar("Успешно добавена кола.", "success");
  //       setIsSubmitted(true);
  //     });
  //   } catch (err) {
  //     showSnackbar(err, "error");
  //   }
  // };

  // if (isSubmitted) {
  //   return <Navigate to="/" />;
  // }

  return (
    <StyledWrapper >
      <Box p="20px">
        <Box className={classes.formWrapper}>
          <Typography fontSize={22} fontWeight={theme.typography.fontWeightBold} style={{ paddingLeft: "26px", paddingTop: "20px", paddingBottom: "20px" }}>Добавяне на кола</Typography>
          <Divider className={classes.divider} sx={{ mb: 4 }}></Divider>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Собственик на колата"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.owner}
                    name="owner"
                    error={!!touched.owner && !!errors.owner}
                    helperText={touched.owner && errors.owner}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Марка на колата"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carMark}
                    name="carMark"
                    error={!!touched.carMark && !!errors.carMark}
                    helperText={touched.carMark && errors.carMark}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Телефонен номер"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Модел на колата"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carModel}
                    name="carModel"
                    error={!!touched.carModel && !!errors.carModel}
                    helperText={touched.carModel && errors.carModel}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Номер на колата"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carNumber}
                    name="carNumber"
                    error={!!touched.carNumber && !!errors.carNumber}
                    helperText={touched.carNumber && errors.carNumber}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="Вин на колата"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.carVIN}
                    name="carVIN"
                    error={!!touched.carVIN && !!errors.carVIN}
                    helperText={touched.carVIN && errors.carVIN}
                    sx={{ gridColumn: "span 1" }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="date"
                    label="Година на производство"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.buildDate}
                    name="buildDate"
                    error={!!touched.buildDate && !!errors.BuildDate}
                    helperText={touched.buildDate && errors.buildDate}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="secondary" variant="outlined">
                    Добави
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </StyledWrapper>
  );
};

const checkoutSchema = yup.object().shape({
  owner: yup
    .string()
    .required("Полето е задължително")
    .min(3, "Полето трябва да е между 3 и 20 символа")
    .max(20, "Полето трябва да е между 3 и 20 символа"),

  carNumber: yup
    .string()
    .min(
      8,
      'Полето трябва да съдържа 8 символа предържайте се към примера "PB3313MG"'
    )
    .max(
      8,
      'Полето трябва да съдържа 8 символа предържайте се към примера "PB3313MG"'
    ),

  carVIN: yup
    .string()
    .min(
      17,
      'Полето трябва да съдържа 17 символа предържайте се към примера "1HGBH41XMN1091176"'
    )
    .max(
      17,
      'Полето трябва да съдържа 17 символа предържайте се към примера "1HGBH41XMN109186"'
    ),

  carModel: yup.string().required("Полето е задължително"),

  carMark: yup.string().required("Полето е задължително"),

  phoneNumber: yup
    .string()
    .required("Полето е задължително")
    .min(10, "Полето не може да съдържа повече от 10 символа")
    .max(10, "Полето не може да съдържа повече от 10 символа"),
  buildDate: yup.date().required("Полето е задължително"),
});
const initialValues = {
  owner: "",
  carNumber: "",
  carModel: "",
  carMark: "",
  carVIN: "",
  phoneNumber: "",
  buildDate: "",
};

export default CreateCar;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {

  return {
    props: {},
  };
});