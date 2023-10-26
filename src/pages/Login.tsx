import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import { useLoginMutation } from "src/context/slices/apiSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup
    .string()
    .min(6, "Username should be in range 6-30 characters")
    .max(30, "Username should be in range 6-30 characters")
    .matches(
      /^[a-zA-Z0-9_]{6,30}$/,
      "Username should contain only letters, numbers, and underscores"
    )
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Password should contain at least one letter and one digit"
    )
    .required("Password is required"),
});

export default function Login() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: LoginFormValues,
      { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
      setSubmitting(false);
      try {
        await login(values).unwrap();
        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4, pb: 4 }}>
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Legal Document Management
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
