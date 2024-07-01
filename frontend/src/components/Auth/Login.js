import { Link } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography } from "@mui/material";

// project import
import AuthLogin from "./auth-forms/AuthLogin";
import AuthWrapper from "./AuthWrapper";

// ================================|| LOGIN ||================================ //

const Login = ({ setIsAuthenticated }) => (
  <AuthWrapper>
    <Grid container spacing={3} sx={{ backgroundColor: "#192351" }}>
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
              fontSize: "1.5rem",
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
              fontStyle: "normal",
              color: "#EAC060",
            }}
          >
            Login
          </Typography>
          <Typography
            component={Link}
            to="/register"
            variant="body1"
            sx={{
              textDecoration: "none",
              margin: "0",
              fontSize: "0.875rem",
              lineHeight: "1.57",
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
              fontStyle: "normal",
              color: "#EAC060",
              WebkitTextDecoration: "none",
              textDecoration: "none",
            }}
          >
            Don&apos;t have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin setIsAuthenticated={setIsAuthenticated} />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
