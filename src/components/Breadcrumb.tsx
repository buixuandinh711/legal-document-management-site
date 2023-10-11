import Typography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";

export default function BasicBreadcrumbs() {
  return (
    <Box sx={{ p: 3 }}>
      <MuiBreadcrumbs aria-label="breadcrumb" sx={{}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Drafting Task</Typography>
      </MuiBreadcrumbs>
      <Typography variant="h4" sx={{}} fontSize={30} fontWeight={600}>
        Drafting Task
      </Typography>
    </Box>
  );
}
