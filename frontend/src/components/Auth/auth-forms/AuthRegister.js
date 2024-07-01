import { useState } from "react";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { SwalAlert } from "../../mypages/SwalAlert";

// assets
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   changePassword("");
  // }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          username: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().max(255).required("First Name is required"),
          lastname: Yup.string().max(255).required("Last Name is required"),
          username: Yup.string().max(255).required("User Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // console.log("Form Values:", values);

            const response = await axios.post(
              "http://127.0.0.1:8000/api/auth/register",
              {
                firstName: values.firstname,
                lastName: values.lastname,
                username: values.username,
                email: values.email,
                password: values.password,
              }
            );
            console.log(response?.data?.token);
            if (response?.status === 200) {
              SwalAlert(
                "Registration Successful",
                "success",
                "Registration Successful"
              );
              // setStatus({ success: true });
            } else {
              SwalAlert(
                "Registration Successful",
                "success",
                response?.errors[0]?.msg
              );
              console.log("register API:", response);
              // setStatus({ success: false });
            }

            setSubmitting(false);
          } catch (error) {
            console.error("API Error:", error);
            // SwalAlert(error?.response?.data?.errors[1].msg, "error", "");
            setStatus({ success: false });
            let errorDesc = error?.response?.data?.errors[0].msg;
            setErrors({ submit: errorDesc });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="firstname-signup"
                    sx={{
                      color: "#838797",
                      fontFamily: "'Public Sans', sans-serif !important",
                    }}
                  >
                    First Name*
                  </InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="first name"
                    sx={{
                      color: "#838797",
                      border: errors.email
                        ? ""
                        : `1px solid  #838797 !important`,
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#838797", // Change this to the desired placeholder color
                        opacity: 1, // Ensure the placeholder is fully opaque
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797 !important", // Change this to your desired active border color
                      },
                    }}
                    fullWidth
                    error={Boolean(touched.firstname && errors.firstname)}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText
                      sx={{
                        color: "#DC6D65",

                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: "normal",
                      }}
                      id="helper-text-firstname-signup"
                    >
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="lastname-signup"
                    sx={{
                      color: "#838797",
                      fontFamily: "'Public Sans', sans-serif !important",
                      fontWeight: 400,
                    }}
                  >
                    Last Name*
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="last name"
                    sx={{
                      color: "#838797",
                      border: errors.email
                        ? ""
                        : `1px solid  #838797 !important`,
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#838797", // Change this to the desired placeholder color
                        opacity: 1, // Ensure the placeholder is fully opaque
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797 !important", // Change this to your desired active border color
                      },
                    }}
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText
                      sx={{
                        color: "#DC6D65",

                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: "normal",
                      }}
                      id="helper-text-lastname-signup"
                    >
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="username-signup"
                    sx={{
                      color: "#838797",
                      fontFamily: "'Public Sans', sans-serif !important",
                      fontWeight: 400,
                    }}
                  >
                    username
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                    id="username-signup"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="username"
                    sx={{
                      color: "#838797",
                      border: errors.email
                        ? ""
                        : `1px solid  #838797 !important`,
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#838797", // Change this to the desired placeholder color
                        opacity: 1, // Ensure the placeholder is fully opaque
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797 !important", // Change this to your desired active border color
                      },
                    }}
                    inputProps={{}}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText
                      sx={{
                        color: "#DC6D65",

                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: "normal",
                      }}
                      id="helper-text-username-signup"
                    >
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="email-signup"
                    sx={{
                      color: "#838797",
                      fontFamily: "'Public Sans', sans-serif !important",
                      fontWeight: 400,
                    }}
                  >
                    Email Address*
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                    sx={{
                      color: "#838797",
                      border: errors.email
                        ? ""
                        : `1px solid  #838797 !important`,
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#838797", // Change this to the desired placeholder color
                        opacity: 1, // Ensure the placeholder is fully opaque
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797 !important", // Change this to your desired active border color
                      },
                    }}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText
                      sx={{
                        color: "#DC6D65",

                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: "normal",
                      }}
                      id="helper-text-email-signup"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="password-signup"
                    sx={{
                      color: "#838797",
                      fontFamily: "'Public Sans', sans-serif !important",
                      fontWeight: 400,
                    }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-signup"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <Visibility
                              sx={{
                                color: "#838797",
                              }}
                            />
                          ) : (
                            <VisibilityOff
                              sx={{
                                color: "#838797",
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="******"
                    inputProps={{}}
                    sx={{
                      color: "#838797",
                      border: errors.email
                        ? ""
                        : `1px solid  #838797 !important`,
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#838797", // Change this to the desired placeholder color
                        opacity: 1, // Ensure the placeholder is fully opaque
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#838797 !important", // Change this to your desired active border color
                      },
                    }}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      sx={{
                        color: "#DC6D65",

                        fontFamily: '"Poppins", sans-serif',
                        fontStyle: "normal",
                      }}
                      id="helper-text-password-signup"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText
                    sx={{
                      color: "#DC6D65",

                      fontFamily: '"Poppins", sans-serif',
                      fontStyle: "normal",
                    }}
                  >
                    {errors.submit}
                  </FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#EAC060",
                    color: "#111938",
                    fontWeight: 700,
                    "&:hover": {
                      backgroundColor: "#EAC060",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
