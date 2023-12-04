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
    .min(4, "Tên người dùng phải từ 4-30 ký tự")
    .max(30, "Tên người dùng phải từ 4-30 ký tự")
    .matches(/^[a-zA-Z0-9_]{4,30}$/, "Tên người dùng chỉ được chứa chữ cái, số, và dấu gạch dưới")
    .required("Yêu cầu nhập tên người dùng"),
  password: yup
    .string()
    .min(4, "Mật khẩu phải có ít nhất 6 ký tự")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/,
      "Mật khẩu phải chứa ít nhất một chữ cái và một chữ số"
    )
    .required("Yêu cầu nhập mật khẩu"),
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
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Tên người dùng"
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
            label="Mật khẩu"
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
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Cần hỗ trợ?
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
