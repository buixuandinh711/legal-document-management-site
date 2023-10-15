import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography
        variant="h1"
        color="error"
        sx={{
          fontSize: "6rem",
          marginBottom: "2",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: "2rem",
        }}
      >
        Page Not Found
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="body1"
          sx={{
            marginTop: "2",
            color: "primary.main",
            cursor: "pointer",
          }}
        >
          Go to Homepage
        </Typography>
      </Link>
    </Box>
  );
}
