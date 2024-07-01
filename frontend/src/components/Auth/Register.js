import { Link } from "react-router-dom";

// material-ui
import { Box, Grid, Stack, Typography } from "@mui/material";

// project import
import FirebaseRegister from "./auth-forms/AuthRegister";
import AuthWrapper from "./AuthWrapper";

// ================================|| REGISTER ||================================ //

const Register = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography
            variant="h3"
            sx={{
              margin: "0",
              fontSize: "1.5rem",
              lineHeight: "1.33",
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
              fontStyle: "normal",
              color: "#EAC060",
            }}
          >
            Sign up
          </Typography>
          <Typography
            component={Link}
            to="/login"
            variant="body1"
            sx={{
              margin: "0",
              fontSize: "0.875rem",
              lineHeight: "1.57",
              fontWeight: 400,
              fontFamily: '"Poppins", sans-serif',
              fontStyle: "normal",
              color: "#EAC060",
              WebkitTextDecoration: "none",
              textDecoration: "none",
            }}
            color="primary"
          >
            Already have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <FirebaseRegister />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Register;
