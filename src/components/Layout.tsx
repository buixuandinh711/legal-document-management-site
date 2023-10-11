import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {
  Divider,
  IconButton,
  List,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { mainListItems, secondaryListItems } from "src/components/drawerRoutes";
import { AccountCircle } from "@mui/icons-material";
import BasicBreadcrumbs from "src/components/Breadcrumb";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout({ children }: { children: React.ReactNode }) {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
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
          <Toolbar sx={{display: "flex", justifyContent: "right"}}>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
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
            <Box sx={{ minHeight: "100vh" }}>{children}</Box>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ pt: 4, pb: 4 }}
            >
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
