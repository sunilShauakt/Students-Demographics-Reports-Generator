import React from "react";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        localStorage.setItem("token", "");
        localStorage.setItem("loggedIn", false);
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem("userType", data.role);
      if (data.role === "ADMIN") {
        return (window.location.href = "./admin-dashboard");
      } else {
        window.location.href = "./userDetails";
      }

      Swal.fire({
        title: response?.errors[0].msg,
        text: "",
        icon: "error",
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://127.0.0.1:8000/api/auth/login",
              {
                email: values.email,
                password: values.password,
              }
            );
            if (response.status === 200) {
              // const role = localStorage.getItem("role");
              localStorage.setItem("token", response?.data?.token);
              localStorage.setItem("loggedIn", true);
              fetchUserProfile(response?.data?.token);
            } else {
              console.log("🚀 ~ onSubmit={ ~ response:", response);
            }
            setSubmitting(false);
          } catch (error) {
            console.error("API Error:", error?.response?.data?.errors);
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="email-login"
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.4375em",
                      fontWeight: 500,
                      fontFamily: '"Poppins", sans-serif',
                      fontStyle: "normal",
                      padding: "0",
                      position: "relative",
                      display: "block",
                      transformOrigin: "top left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      transition:
                        "color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                      color: "#838797",
                    }}
                  >
                    Email Address
                  </InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    autoComplete="off"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{
                      color: "#838797 !important",
                      border: errors.email ? "" : `1px solid  #838797`,
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
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="password-login"
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.4375em",
                      fontWeight: 500,
                      fontFamily: '"Poppins", sans-serif',
                      fontStyle: "normal",
                      padding: "0",
                      position: "relative",
                      display: "block",
                      transformOrigin: "top left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      transition:
                        "color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
                      color: "#838797",
                    }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
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
                            <Visibility style={{ color: "#838797" }} />
                          ) : (
                            <VisibilityOff style={{ color: "#838797" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
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
                      error
                      id="standard-weight-helper-text-password-login"
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
                      fontWeight: 500,
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
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
