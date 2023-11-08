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
import { PositioRole, useUserQuery } from "src/context/slices/apiSlice";
import SelectPosition from "src/components/Layout/SelectPosition";
import FullPageLoading from "src/pages/FullPageLoading";
import AppbarUser from "src/components/Layout/AppbarUser";
import Snackbar from "src/components/Snackbar";
import { useAppSelector } from "src/context/store";
import { blue } from "@mui/material/colors";
import Logo from "src/components/Layout/Logo";

const defaultTheme = createTheme();

export default function Layout() {
  const userQuery = useUserQuery({});
  const { positionRole } = useAppSelector((state) => state.position);

  if (userQuery.isLoading) {
    return <FullPageLoading />;
  }

  if (!userQuery.isSuccess) {
    return <Navigate to="/login" />;
  }

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
            <AppbarUser officerName={userQuery.data.officerName} />
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
            <Logo />
          </Toolbar>
          <Box sx={{ overflow: "auto" }}>
            <List>{mainListItems}</List>
            {positionRole === PositioRole.Manager && (
              <>
                <Divider />
                <List>{secondaryListItems}</List>
              </>
            )}
          </Box>
        </Paper>
        <Snackbar />
        <Box
          component="main"
          sx={{
            width: "calc(100% - 264px)",
            ml: "256px",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Toolbar />
          <BasicBreadcrumbs />
          <Container
            maxWidth="lg"
            sx={{
              mt: 0,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Outlet />
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
