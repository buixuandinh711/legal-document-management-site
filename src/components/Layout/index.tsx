import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Divider, List, Paper } from "@mui/material";
import { mainListItems, secondaryListItems } from "src/components/Layout/drawerRoutes";
import BasicBreadcrumbs from "src/components/Breadcrumb";
import { Navigate, Outlet } from "react-router-dom";
import { useUserQuery } from "src/context/slices/apiSlice";
import Loading from "src/pages/Loading";
import LayoutUser from "src/components/Layout/LayoutUser";
import SelectPosition from "src/components/Layout/SelectPosition";

const defaultTheme = createTheme();

export default function Layout() {
  const userQuery = useUserQuery({});

  if (userQuery.isLoading) {
    return <Loading />;
  }

  if (!userQuery.isSuccess) {
    return <Navigate to="/login" />;
  }

  console.log(userQuery.data);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: "calc(100% - 264px)",
            borderRadius: 4,
            right: 8,
            top: 8,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "right" }}>
            <SelectPosition positions={userQuery.data.positions} />
            <LayoutUser officerName={userQuery.data.officerName} />
          </Toolbar>
        </AppBar>
        <Paper
          sx={{
            width: 240,
            flexShrink: 0,
            borderRadius: 4,
            position: "fixed",
            left: 8,
            top: 8,
            bottom: 8,
          }}
        >
          <Toolbar>
            <Typography variant="h5" component="div" sx={{}}>
              LegalDocs
            </Typography>
          </Toolbar>
          <Box sx={{ overflow: "auto" }}>
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Box>
        </Paper>
        <Box
          component="main"
          sx={{
            width: "calc(100% - 264px)",
            ml: "256px",
          }}
        >
          <Toolbar />
          <BasicBreadcrumbs />
          <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Box sx={{ minHeight: "100vh" }}>
              <Outlet />
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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
